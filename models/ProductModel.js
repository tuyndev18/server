import mongoose from "mongoose";

const ProductModel = new mongoose.Schema(
  {
    categories: [
      {
        value: String,
        label: String,
      },
    ],
    price: Number,
    title: { type: String, required: true },
    description: { type: String, required: true },
    detail: { type: String, required: true },
    gallery: [{ type: String }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const Products = mongoose.model("Products", ProductModel);
export default Products;
