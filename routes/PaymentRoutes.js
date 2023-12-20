import express from "express";
import midtransClient from "midtrans-client";
import Order from "../models/Order.js";
import AsyncError from "../middlewares/AsyncError.js";
import { Administrator, Customer, authenticateUser } from "./ProtectedRoute.js";

const router = express.Router();

// SERVER NOTIFICATION
router.post("/v1/notification", async (req, res) => {
  const core = new midtransClient.CoreApi();

  core.apiConfig.set({
    isProduction: false,
    serverKey: process.env.SERVER_KEY,
    clientKey: process.env.CLIENT_KEY,
  });
  try {
    const statusResponse = await core.transaction.notification(req.body);
    const orderId = statusResponse.order_id;
    const transactionStatus = statusResponse.transaction_status;
    const fraudStatus = statusResponse.fraud_status;

    if (transactionStatus == "capture") {
      if (fraudStatus == "challenge") {
        // TODO set transaction status on your database to 'challenge'
        // and response with 200 OK
        updateTransaction("pending", orderId);
        res.status(200);
      } else if (fraudStatus == "accept") {
        // TODO set transaction status on your database to 'success'
        // and response with 200 OK
        updateProduct(orderId);
        updateTransaction("success", orderId);
        res.status(200);
      }
    } else if (transactionStatus == "settlement") {
      // TODO set transaction status on your database to 'success'
      // and response with 200 OK
      res.status(200).json({ message: "Pembayaran Berhasil" });
      updateTransaction("success", orderId);
      res.status(200);
    } else if (
      transactionStatus == "cancel" ||
      transactionStatus == "deny" ||
      transactionStatus == "expire"
    ) {
      // TODO set transaction status on your database to 'failure'
      // and response with 200 OK
      res.status(200).json({ message: "Pembayaran Gagal" });
      updateTransaction("failed", orderId);
      res.status(200);
    } else if (transactionStatus == "pending") {
      // TODO set transaction status on your database to 'pending' / waiting payment
      // and response with 200 OK
      res.status(200).json({ message: "Pembayaran Berhasil" });
      updateTransaction("pending", orderId);
      res.status(200);
    }
  } catch (error) {
    console.log(error);
    res.status(500);

    res.status(500).json({ message: error.message });
  }
});

// HANDLE PEMBAYARAN DENGAN MIDTRANS
router.post("/transactions", authenticateUser, Customer, (req, res) => {
  try {
    let snap = new midtransClient.Snap({
      isProduction: process.env.NODE_MODE === "DEVELOPMENT" ? false : true,
      serverKey: process.env.SERVER_KEY,
      clientKey: process.env.CLIENT_KEY,
    });

    let parameter = {
      transaction_details: {
        order_id: req.body.orderId,
        gross_amount: req.body.payment,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name: req.body.name,
        email: req.body.email,
      },
      callbacks: {
        finish: `${process.env.DOMAIN}/status-payment`,
      },
      enabled_payments: [
        "credit_card",
        "mandiri_clickpay",
        "bca_klikbca",
        "bca_klikpay",
        "echannel",
        "permata_va",
        "bca_va",
        "bni_va",
        "other_va",
      ],
    };

    snap
      .createTransaction(parameter)
      .then((transaction) => {
        const dataPayment = {
          midtransResponse: JSON.stringify(transaction),
        };

        let transactionToken = transaction.token;

        res.status(200).json({
          status: true,
          message: "berhasil",
          dataPayment,
          token: transactionToken,
        });
      })
      .catch((e) => {
        console.log(e);

        res.status(400).json({
          status: false,
          message: "Pembayaran gagal",
          error: e.message,
        });
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// MEMPERBARUI STATUS PEMBAYARAN
router.get(
  "/status/:order_id",
  authenticateUser,
  AsyncError(async (req, res) => {
    let snap = new midtransClient.Snap({
      isProduction: process.env.NODE_MODE === "DEVELOPMENT" ? false : true,
      serverKey: process.env.SERVER_KEY,
      clientKey: process.env.CLIENT_KEY,
    });

    snap.transaction
      .status(req.params.order_id)
      .then(async (response) => {
        // do something to `response` object

        const order = await Order.findOne({ order: req.params.order_id });

        order.status = response.transaction_status;

        await order.save();

        if (order.status === "settlement") {
          res.status(200).json({ message: "Pembayaran diterima" });
        } else if (order.status === "pending") {
          res.status(200).json({ message: "Pembayaran sedang diproses" });
        } else if (order.status === "expire") {
          res.status(200).json({ message: "Pembayaran telah kadaluarsa" });
        }
      })
      .catch((error) => {
        res.status(404).json({
          success: false,
          message: "order tidak ditemukan",
          error: error.message,
        });
      });
  })
);

// Create Order
router.post(
  "/create",
  authenticateUser,
  Customer,
  AsyncError(async (req, res) => {
    try {
      const order = await Order.create(req.body);

      res
        .status(200)
        .json({ message: "Pembayaran berhasil dibuat", order: order });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  })
);

// Detail Order
router.get(
  "/status/:order_id",
  authenticateUser,
  AsyncError(async (req, res) => {
    let snap = new midtransClient.Snap({
      isProduction: process.env.PRODUCTION,
      serverKey: process.env.SERVER_KEY,
      clientKey: process.env.CLIENT_KEY,
    });

    snap.transaction
      .status(req.params.order_id)
      .then((response) => {
        // do something to `response` object
        res.status(200).json({
          success: true,
          response,
        });
      })
      .catch((error) => {
        res.status(404).json({
          success: false,
          message: "order tidak ditemukan",
          error: error.message,
        });
      });
  })
);

router.get(
  "/admin/get-orders",
  AsyncError(async (req, res) => {
    const orders = await Order.find({ status: "settlement" })
      .populate({
        path: "user",
        select: "-password", // menghilangkan field password
      })
      .sort({
        createdAt: -1,
      });

    res.status(200).json(orders);
  })
);

export default router;
