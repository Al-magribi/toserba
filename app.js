import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import User from "./models/User.js";
import ErrorMiddleware from "./middlewares/ErrorMiddleware.js";
import path from "path";
import { fileURLToPath } from "url";

import ProductRoutes from "./routes/PoductRoutes.js";
import UserRoutes from "./routes/UserRoutes.js";
import ShippingRoutes from "./routes/ShippingRoutes.js";
import PaymentRoutes from "./routes/PaymentRoutes.js";
import GoogleRoutes from "./routes/GoogleRoutes.js";
import OrderRoutes from "./routes/OrderRoutes.js";
import CartRoutes from "./routes/CartRoutes.js";
import StoreRoutes from "./routes/StoreRoutes.js";

import { Strategy as GoogleStrategy } from "passport-google-oauth2";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors({ credentials: true, origin: process.env.DOMAIN }));

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static(path.join(__dirname, "upload")));

app.use(
  session({
    secret: process.env.JWT_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Ubah menjadi true jika menggunakan HTTPS
      httpOnly: true, // Jangan akses cookie melalui JavaScript
      maxAge: 259200000, // Waktu kedaluwarsa cookie dalam milidetik
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: `${process.env.API_DOMAIN}/auth/google/toserba`,
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate(
        {
          name: profile.displayName,
          username: profile.email,
          avatar: profile.picture,
          googleId: profile.id,
        },
        function (err, user) {
          return cb(err, user);
        }
      );
    }
  )
);

app.use("/auth", GoogleRoutes);
app.use("/api/product", ProductRoutes);
app.use("/api/user", UserRoutes);
app.use("/api/shipping", ShippingRoutes);
app.use("/api/payment", PaymentRoutes);
app.use("/api/orders", OrderRoutes);
app.use("/api/cart", CartRoutes);
app.use("/api/store", StoreRoutes);

app.use(ErrorMiddleware);
export default app;
