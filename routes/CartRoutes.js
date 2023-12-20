import express from "express";
import AsyncError from "../middlewares/AsyncError.js";
import Cart from "../models/Cart.js";
import { Administrator, Customer, authenticateUser } from "./ProtectedRoute.js";
import mongoose from "mongoose";

const {
  Types: { ObjectId },
} = mongoose;

const router = express.Router();

// Creating cart
router.post(
  "/add-to-cart",
  authenticateUser,
  Customer,
  AsyncError(async (req, res) => {
    try {
      const myCart = await Cart.findOne({ user: req.user.id });

      if (myCart) {
        myCart.products.push(req.body.products);

        const updateCart = await myCart.save();

        res.status(200).json({ message: "Berhasil ditambahkan" });
      } else {
        const cart = await Cart.create(req.body);

        res.status(200).json({ message: "Berhasil ditambahkan" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
);

// get my cart
router.get(
  "/my-cart",
  authenticateUser,
  Customer,
  AsyncError(async (req, res) => {
    try {
      const cart = await Cart.findOne({ user: req.user.id })
        .sort({ createdAt: -1 })
        .populate({
          path: "products",
          populate: { path: "productId", model: "product" },
        });

      if (!cart) {
        return res.status(404).json({ message: "Data tidak ditemukan" });
      }

      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
);

// delete Product from cart
router.delete(
  "/my-cart/:id",
  authenticateUser,
  Customer,
  AsyncError(async (req, res) => {
    try {
      const deleteProduct = req.params.id;

      const cart = await Cart.findOne({ user: req.user.id });

      if (!cart) {
        res.status(404).json({ message: "Data tidak ditemukan" });
      }

      const product = cart.products.find(
        (product) => product._id.toString() === deleteProduct
      );

      if (product) {
        cart.products.pull(product);

        await cart.save();

        return res.status(200).json({ message: "Berhasil dihapus" });
      } else {
        return res.status(404).json({ message: "produk tidak ditemukan" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
);

// delete cart
router.delete(
  "/delete/my-cart/:userId",
  AsyncError(async (req, res) => {
    try {
      const { ids } = req.body;

      const cart = await Cart.findOne({ user: req.params.userId });

      // Convert cart.productIds to strings
      const productIdsInCart = cart.products.map((product) =>
        product.productId.toString()
      );

      // Filter out products with ids to be deleted
      cart.products = cart.products.filter(
        (product) => !ids.includes(product._id.toString())
      );

      await cart.save();

      res.status(200).json({ message: "Berhasil", cart: cart.products });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  })
);

export default router;
