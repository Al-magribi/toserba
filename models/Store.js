import { Schema, model } from "mongoose";

const storeSchema = new Schema(
  {
    name: { type: String, required: true },
    province: { type: String, required: true },
    provinceId: { type: String, required: true },
    city: { type: String, required: true },
    cityId: { type: String, required: true },
    address: { type: String, required: true },
    slider: [
      {
        link: {
          type: String,
          required: false,
        },
      },
    ],
    logo: { type: String, required: true },
  },
  { timestamps: true }
);

export default model("store", storeSchema);
