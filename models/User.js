import { Schema, model } from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import findOrCreate from "mongoose-findorcreate";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    avatar: {
      type: String,
      default:
        "https://firebasestorage.googleapis.com/v0/b/toserba-images.appspot.com/o/avatar%2Fuser_1177568.png?alt=media&token=3c53a161-f746-4251-a5e7-5d1adfd6d3a2",
    },
    phone: { type: String, required: false, default: "-" },
    username: { type: String, required: true },
    password: { type: String, required: false },
    role: { type: String, default: "user" },
    province: { type: String },
    city: { type: String },
    district: { type: String },
    hash: { type: String },
    salt: { type: String },
    googleId: { type: String },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: 3 * 60 * 60 * 1000,
  });
};

userSchema.methods.PasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 5 * 60 * 60 * 1000;

  return resetToken;
};

export default model("user", userSchema);
