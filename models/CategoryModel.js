import mongoose from "mongoose";

const CategoryModel = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    banner: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Categories = mongoose.model("Categories", CategoryModel);

export default Categories;
