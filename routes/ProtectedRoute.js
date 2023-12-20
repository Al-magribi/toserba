import jwt from "jsonwebtoken";
import AsyncError from "../middlewares/AsyncError.js";
import User from "../models/User.js";

const authenticateUser = AsyncError(async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Token tidak valid" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);

    return res.status(401).json({
      message: "anda tidak memiliki otoritas untuk mengakses halaman ini",
    });
  }
});

const Customer = AsyncError(async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Token tidak valid" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findById(decoded.id);

    if (!user) {
      res.status(404).json({ message: "User tidak ditemukan" });
    }

    if (user.role !== "user") {
      res.status(403).json({
        message: "Anda tidak memiliki otoritas untuk mengakses halaman ini",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

const Administrator = AsyncError(async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Token tidak valid" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findById(decoded.id);

    if (!user) {
      res.status(404).json({ message: "User tidak ditemukan" });
    }

    if (user.role !== "admin") {
      res.status(401).json({
        message: "Anda tidak memiliki otoritas untuk mengakses halaman ini",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export { authenticateUser, Customer, Administrator };
