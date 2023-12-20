import express from "express";
import AsyncError from "../middlewares/AsyncError.js";
import Product from "../models/Product.js";
import multer from "multer";
import path from "path";
import xlsx from "xlsx";
import fs from "fs";
import { Administrator, Customer, authenticateUser } from "./ProtectedRoute.js";

const router = express.Router();

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./upload/images");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      path.parse(file.originalname).name +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

const fileStorage = new multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./upload/templete");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      path.parse(file.originalname).name +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

const uploadImages = multer({ storage: imageStorage }).array("image", 30);
const uploadFile = multer({ storage: fileStorage });

router.post(
  "/add-new",
  uploadImages,
  authenticateUser,
  Administrator,
  AsyncError(async (req, res) => {
    try {
      const images = req.files.map(
        (file) => process.env.API_DOMAIN + "/images/" + file.filename
      );

      req.body.profit = req.body.price - req.body.capital;

      const product = await Product.create({
        name: req.body.name,
        desc: req.body.desc,
        category: req.body.category,
        image: images.map((link) => ({ link })),
        price: req.body.price,
        capital: req.body.capital,
        profit: req.body.profit,
        stock: req.body.stock,
        weight: req.body.weight,
      });

      res.status(200).json({ message: "Berhasil dibuat" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  })
);

router.get(
  "/get-all",
  AsyncError(async (req, res, next) => {
    try {
      const searchTerm = req.query.search || "";
      const category = req.query.category || "";

      const query = {
        name: { $regex: searchTerm, $options: "i" },
        category: { $regex: category, $options: "i" },
      };
      const products = await Product.find(query).sort({ createdAt: -1 });

      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
);

router.get(
  "/:name",
  AsyncError(async (req, res, next) => {
    try {
      const product = await Product.findOne({
        name: req.params.name,
      }).populate({
        path: "reviews.user",
        model: "user",
        select: "-password -username",
      });

      if (!product) {
        res.status(404).json({ message: "data tidak ditemukan" });
      } else {
        res.status(200).json(product);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
);

router.put(
  "/update/:id",
  uploadImages,
  authenticateUser,
  Administrator,
  AsyncError(async (req, res) => {
    try {
      let product = await Product.findById(req.params.id);

      if (!product) {
        return res.status(404).json({ message: "Data tidak ditemukan" });
      }

      if (req.files.length > 0) {
        const images = req.files.map(
          (file) => process.env.API_DOMAIN + "/images/" + file.filename
        );

        const profit = req.body.price - req.body.capital;

        const data = {
          name: req.body.name,
          desc: req.body.desc,
          category: req.body.category,
          image: images.map((link) => ({ link })),
          price: req.body.price,
          capital: req.body.capital,
          profit: profit,
          stock: req.body.stock,
          weight: req.body.weight,
        };

        product = await Product.findByIdAndUpdate(req.params.id, data, {
          new: true,
          runValidators: true,
        });

        res.status(200).json({ message: "Berhasil diperbarui" });
      } else {
        const profit = req.body.price - req.body.capital;

        const data = {
          name: req.body.name,
          desc: req.body.desc,
          category: req.body.category,
          price: req.body.price,
          capital: req.body.capital,
          profit: profit,
          stock: req.body.stock,
          weight: req.body.weight,
        };

        product = await Product.findByIdAndUpdate(req.params.id, data, {
          new: true,
          runValidators: true,
        });

        res.status(200).json({ message: "Berhasil diperbarui" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
);

router.delete(
  "/delete/:id",
  authenticateUser,
  Administrator,
  AsyncError(async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);

      if (!product) {
        return res.status(404).json({ message: "Data tidak ditemukan" });
      }

      await product.deleteOne();

      res.status(200).json({ message: "Berhasil dihapus" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
);

router.post(
  "/upload-product",
  authenticateUser,
  Administrator,
  uploadFile.single("file"),
  AsyncError(async (req, res) => {
    try {
      const workbook = xlsx.readFile(req.file.path);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = xlsx.utils.sheet_to_json(worksheet);

      let count = 0;

      const products = data.map((item) => ({
        name: item.name,
        desc: item.desc,
        price: item.price,
        capital: item.capital,
        profit: item.profit,
        stock: item.stock,
        weight: item.weight,
        category: item.category,
      }));

      const savedProducts = await Product.insertMany(products);

      count = savedProducts.length;

      fs.unlinkSync(req.file.path);

      return res
        .status(200)
        .json({ message: `${count} produk berhasil ditambahkan` });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  })
);

router.delete(
  "/delete-products",
  authenticateUser,
  Administrator,
  AsyncError(async (req, res) => {
    try {
      await Product.deleteMany({});

      res.status(200).json({ message: "Berhasil dihapus" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  })
);

router.post(
  "/create-review/:id",
  authenticateUser,
  Customer,
  AsyncError(async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);

      if (!product) {
        return res.status(404).json({ message: "Data tidak ditemukan" });
      }

      const newReview = {
        user: req.body.user,
        rating: req.body.rating,
        comment: req.body.comment,
      };

      const isReviewed = product.reviews.find(
        (r) => r.user.toString() === req.body.user.toString()
      );

      if (isReviewed) {
        product.reviews.forEach((review) => {
          if (review.user.toString() === req.body.user.toString()) {
            (review.comment = req.body.comment),
              (review.rating = req.body.rating);
          }
        });

        product.rating = Math.round(
          product.reviews.reduce((acc, item) => acc + item.rating, 0) /
            product.reviews.length
        );

        await product.save();

        res
          .status(200)
          .json({ message: "Berhasil diperbarui", product: product });
      } else {
        product.reviews.push(newReview);

        product.rating =
          product.reviews.reduce((acc, item) => acc + item.rating, 0) /
          product.reviews.length;

        await product.save();

        res
          .status(200)
          .json({ message: "Berhasil ditambahkan", product: product });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  })
);

export default router;
