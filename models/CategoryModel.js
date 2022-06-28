import mongoose from "mongoose";
import slug from "mongoose-slug-updater";

mongoose.plugin(slug);

const CategoryModel = new mongoose.Schema(
  {
    label: {
      type: String,
    },
    banner: {
      type: String,
    },
    value: { type: String, slug: "label", slugPaddingSize: 3, unique: true },
    description: { type: String },
    parentId: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Categories = mongoose.model("Categories", CategoryModel);

export default Categories;
