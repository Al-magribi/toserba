import express from "express";
import Order from "../models/Order.js";
import AsyncError from "../middlewares/AsyncError.js";
import { Administrator, Customer, authenticateUser } from "./ProtectedRoute.js";

const router = express.Router();

router.get(
  "/get-orders",
  authenticateUser,
  Administrator,
  AsyncError(async (req, res) => {
    try {
      const orders = await Order.find()
        .sort({ createdAt: -1 })
        .populate({
          path: "products",
          populate: { path: "productId", model: "product" },
        })
        .populate({ path: "user", model: "user" });

      res.status(200).json(orders);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  })
);

router.get(
  "/my-order/:user",
  authenticateUser,
  Customer,
  AsyncError(async (req, res) => {
    try {
      const orders = await Order.find({ user: req.params.user })
        .sort({
          createdAt: -1,
        })
        .populate({
          path: "products",
          populate: { path: "productId", model: "product" },
        });

      if (!orders) {
        return res.status(404).json({ message: "pesanan tidak ditemukan" });
      }

      res.status(200).json(orders);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  })
);

router.get(
  "/detail-order/:user/:orderId",
  authenticateUser,
  AsyncError(async (req, res) => {
    try {
      const order = await Order.find({ user: req.params.user });

      const detail_order = order.find(
        (order) => order.order === req.params.orderId
      );

      if (!detail_order) {
        return res.status(404).json({ message: "Data tidak ditemukan" });
      }

      // Await the populate method separately
      await Order.populate(detail_order, {
        path: "products",
        populate: { path: "productId", model: "product" },
      });

      await Order.populate(detail_order, {
        path: "user",
        model: "user",
      });

      res.status(200).json(detail_order);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  })
);

router.put(
  "/update-order/:id",
  authenticateUser,
  Administrator,
  AsyncError(async (req, res) => {
    try {
      let order = await Order.findById(req.params.id);

      if (!order) {
        return res.status(404).json({ message: "data tidak ditemukan" });
      }

      order.status_order = req.body.status;
      order.resi = req.body.resi;

      await order.save();

      return res.status(200).json({ message: "Berhasil diperbarui" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  })
);

router.delete(
  "/delete-order/:id",
  authenticateUser,
  Administrator,
  AsyncError(async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return res.status(404).json({ message: "data tidak ditemukan" });
      }

      await order.deleteOne();

      res.status(200).json({ message: "Berhasil dihapus" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  })
);

export default router;
