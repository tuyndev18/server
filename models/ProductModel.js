import mongoose from "mongoose";
import slug from "mongoose-slug-updater";

mongoose.plugin(slug);

const ProductModel = new mongoose.Schema(
  {
    category: {
      type: Object,
    },
    subCategory: {
      type: Object,
    },
    color: {
      type: Object,
    },
    type: {
      type: Object,
    },
    texture: {
      type: Object,
    },
    price: Number,
    size: Number,
    title: { type: String },
    description: { type: String },
    detail: { type: String },
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
