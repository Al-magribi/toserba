import exprress from "express";
import User from "../models/User.js";
import AsyncError from "../middlewares/AsyncError.js";
import passport from "passport";
import createToken from "../middlewares/Token.js";
import jwt from "jsonwebtoken";
import { authenticateUser, Customer, Administrator } from "./ProtectedRoute.js";
import SendEmail from "./SendEmail.js";
import crypto from "crypto";

const router = exprress.Router();

router.get(
  "/get-all",
  authenticateUser,
  Administrator,
  AsyncError(async (req, res, next) => {
    try {
      const users = await User.find({ role: "user" }).sort({ createdAt: -1 });

      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
);

router.delete(
  "/:user/delete",
  authenticateUser,
  Administrator,
  AsyncError(async (req, res) => {
    try {
      const user = await User.findById(req.params.user);

      if (!user) {
        return res.status(404).json({ message: "user tidak ditemukan" });
      }

      user.deleteOne();

      res.status(200).json({ message: "user berhasil dihapus" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  })
);

router.post(
  "/register",
  AsyncError(async (req, res, next) => {
    const phoneNumber = req.body.phone.replace(/^0/, "62");

    try {
      User.register(
        {
          name: req.body.name,
          avatar: req.body.avatar,
          username: req.body.username,
          phone: phoneNumber,
        },
        req.body.password,
        (error, user) => {
          if (error) {
            res.status(500).json({ message: error.message });
          } else {
            createToken(user, 200, res);
          }
        }
      );
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
);

router.post(
  "/login",
  AsyncError(async (req, res, next) => {
    try {
      passport.authenticate("local", (error, user, info) => {
        if (error) {
          res.status(500).json({ message: error.message });
        } else if (!user) {
          res.status(404).json({ message: "Username atau password salah" });
        } else {
          req.login(user, function (error) {
            if (error) {
              res.status(500).json({ message: error.message });
            } else {
              createToken(user, 200, res);
            }
          });
        }
      })(req, res, next);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
);

router.get(
  "/profile",
  authenticateUser,
  AsyncError(async (req, res) => {
    const token = req.cookies.token;

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      const user = await User.findById(decoded.id);

      if (!user) {
        res.status(404).json({ message: "User tidak ditemukan" });
      } else {
        res.status(200).json(user);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });

      console.log(error);
    }
  })
);

router.post(
  "/change-password",
  authenticateUser,
  AsyncError(async (req, res, next) => {
    await User.findByUsername(req.body.username, (error, user) => {
      if (error) {
        res.status(500).json({ message: error.message });
      } else {
        user.changePassword(
          req.body.oldPassword,
          req.body.newPassword,
          (error) => {
            if (error) {
              res.status(400).json({ message: "Password tidak sesuai" });
            } else {
              res
                .status(200)
                .json({ message: "Password Berhasil diperbarui!" });
            }
          }
        );
      }
    });
  })
);

router.put(
  "/change-profile",
  authenticateUser,
  Customer,
  AsyncError(async (req, res, next) => {
    const id = req.user.id;

    try {
      let user = await User.findById(id);

      if (!user) {
        res.status(404).json({ message: "Data tidak ditemukan" });
      }

      user = await User.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });

      res.status(200).json({ message: "Berhasil diperbarui", user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
);

router.post(
  "/send-email-token",
  AsyncError(async (req, res) => {
    const user = await User.findOne({ username: req.body.email });

    try {
      if (!user) {
        res
          .status(404)
          .json({ message: "Email yang anda masukan tidak ditemukan" });
      } else {
        const resetToken = user.PasswordToken();

        await user.save({ validateBeforeSave: false });

        const url = `${process.env.DOMAIN}/reset/${resetToken}`;

        const message = `Klik link ini unutk mereset password anda:\n\n${url}\n\nAbaikan jika anda tidak mereset password`;

        await SendEmail({
          email: user.username,
          subject: "Reset Password",
          message,
        });

        res.status(200).json({ message: `terkirim ke ${user.username}` });
      }
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save({ validateBeforeSave: false });

      return res.status(500).json({ message: error.message });
    }
  })
);

router.put(
  "/reset-password/:token",
  AsyncError(async (req, res) => {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      res.status(404).json({ message: "Token tidak valid" });
    } else {
      try {
        await user.setPassword(req.body.password);
        await user.save();
        res.status(200).json({ message: "Password berhasil diperbarui!" });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }
  })
);

router.get(
  "/logout",
  AsyncError(async (req, res, next) => {
    try {
      req.logout(function (error) {
        if (error) {
          res.status(500).json({ message: error.message });
        } else {
          req.session.destroy();

          const cookies = Object.keys(req.cookies);

          cookies.forEach((cookieName) => {
            res.clearCookie(cookieName, {
              domain:
                process.env.NODE === "PRODUCTION"
                  ? process.env.DOMAIN
                  : "localhost",
              path: "/",
            });
          });
          res.status(200).json({ message: "Berhasil Logout" });
        }
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
);

export default router;
