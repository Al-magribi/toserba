import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    desc: { type: String, required: true },
    category: { type: String, required: true },
    image: [{ link: { type: String, required: false } }],
    price: { type: Number, default: 0, required: true },
    capital: { type: Number, default: 0, required: true },
    profit: { type: Number, default: 0, required: true },
    stock: { type: Number, default: 0, required: true },
    weight: { type: Number, default: 0, required: true },
    rating: { type: Number, default: 0, required: false },
    reviews: [
      {
        user: { type: Schema.Types.ObjectId, ref: "user", required: false },
        rating: { type: Number, required: false },
        comment: { type: String, required: false },
        createdAt: { type: Date, default: Date.now, required: false },
        updatedAt: { type: Date, default: Date.now, required: false },
      },
    ],
  },
  { timestamps: true }
);

export default model("product", productSchema);
