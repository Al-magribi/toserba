import express from "express";
import axios from "axios";
import AsyncError from "../middlewares/AsyncError.js";

axios.defaults.baseURL = process.env.BASE_URL;
axios.defaults.headers.common["key"] = process.env.ONGKIR_KEY;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

const router = express.Router();

router.get(
  "/provinces",
  AsyncError(async (req, res) => {
    try {
      const provinces = await axios.get("/province");

      res.status(200).json(provinces.data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
);

router.get(
  `/city/:province_id`,
  AsyncError(async (req, res) => {
    try {
      const id = req.params.province_id;

      const city = await axios.get(`/city?province=${id}`);

      res.status(200).json(city.data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
);

router.get(
  "/get-cost/:origin/:destination/:weight/:courier",
  async (req, res) => {
    try {
      const param = req.params;

      const cost = await axios.post("/cost", {
        origin: param.origin,
        destination: param.destination,
        weight: param.weight,
        courier: param.courier,
      });

      res.status(200).json(cost.data);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

export default router;
