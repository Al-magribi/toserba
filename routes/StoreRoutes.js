import express from "express";
import AsyncError from "../middlewares/AsyncError.js";
import multer from "multer";
import path from "path";
import Store from "../models/Store.js";

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

const uploadImages = multer({ storage: imageStorage });

router.get(
  "/get-data",
  AsyncError(async (req, res) => {
    try {
      const id = "657bd2a8417c33bbad4850fc";

      const store = await Store.findById(id);

      res.status(200).json(store);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  })
);

router.post(
  "/create-store",
  uploadImages.fields([
    { name: "logo", maxCount: 1 },
    { name: "slider", maxCount: 30 },
  ]),
  AsyncError(async (req, res) => {
    try {
      const store = await Store.create({
        name: req.body.name,
        province: req.body.province,
        city: req.body.city,
        address: req.body.address,
        slider: req.body.slider,
        logo: req.body.logo,
      });

      res.status(200).json({ message: "Berhasil di buat" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  })
);

router.put(
  "/update-store",
  uploadImages.fields([
    { name: "logo", maxCount: 1 },
    { name: "slider", maxCount: 30 },
  ]),
  AsyncError(async (req, res) => {
    try {
      const id = "657bd2a8417c33bbad4850fc";

      if (req.files["logo"] && req.files["slider"]) {
        const logo =
          process.env.API_DOMAIN + "/images/" + req.files["logo"][0].filename;

        const slider = req.files["slider"].map(
          (file) => process.env.API_DOMAIN + "/images/" + file.filename
        );

        const data = {
          name: req.body.name,
          province: req.body.province,
          city: req.body.city,
          address: req.body.address,
          slider: slider.map((link) => ({ link })),
          logo: logo,
        };

        const store = await Store.findByIdAndUpdate(id, data, {
          runValidators: true,
          new: true,
        });

        res.status(200).json({ message: "Berhasil diperbarui" });
      } else if (req.files["logo"]) {
        const logo =
          process.env.API_DOMAIN + "/images/" + req.files["logo"][0].filename;

        const data = {
          name: req.body.name,
          province: req.body.province,
          city: req.body.city,
          address: req.body.address,
          logo: logo,
        };

        const store = await Store.findByIdAndUpdate(id, data, {
          runValidators: true,
          new: true,
        });

        res.status(200).json({ message: "Berhasil diperbarui" });
      } else if (req.files["slider"]) {
        const slider = req.files["slider"].map(
          (file) => process.env.API_DOMAIN + "/images/" + file.filename
        );

        const data = {
          name: req.body.name,
          province: req.body.province,
          city: req.body.city,
          address: req.body.address,
          slider: slider.map((link) => ({ link })),
        };

        const store = await Store.findByIdAndUpdate(id, data, {
          runValidators: true,
          new: true,
        });

        res.status(200).json({ message: "Berhasil diperbarui" });
      } else {
        const data = {
          name: req.body.name,
          province: req.body.province,
          city: req.body.city,
          address: req.body.address,
        };

        const store = await Store.findByIdAndUpdate(id, data, {
          runValidators: true,
          new: true,
        });

        res.status(200).json({ message: "Berhasil diperbarui" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  })
);

export default router;
