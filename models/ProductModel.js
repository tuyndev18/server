import mongoose from "mongoose";
import slug from "mongoose-slug-updater";

mongoose.plugin(slug);

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
    slug: { type: String, slug: "title", slugPaddingSize: 3, unique: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const Products = mongoose.model("Products", ProductModel);
export default Products;
