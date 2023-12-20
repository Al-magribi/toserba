import { Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
    order: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    subtotal: { type: Number, required: true },
    payment: { type: Number, required: true },
    shipping_cost: { type: Number, required: true },
    status: { type: String, required: true },
    status_order: { type: String, default: "processing" },
    resi: { type: String, default: "00-000" },
    products: [
      {
        productId: { type: Schema.Types.ObjectId, required: true },
        qty: { type: Number, required: true },
        total_price: { type: Number, required: true },
        total_profit: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

export default model("order", orderSchema);
