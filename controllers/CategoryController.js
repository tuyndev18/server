import Category from "../models/CategoryModel.js";
import { QueryMethod } from "../Utils/QueryMethod.js";

const CategoryController = {
  addCategory: async (req, res, next) => {
    try {
      const { label, banner, description, parentId } = req.body;
      const data = await Category.create({
        label,
        banner,
        description,
        parentId,
      });
      res.json({ data, message: "add new categories" });
    } catch (error) {
      next(error);
    }
  },

  getChild: async (req, res, next) => {
    try {
      const parent = await Category.find({ value: req.params.slug });
      const data = await Category.find({ parentId: parent[0]._id });
      res.json({ data });
    } catch (error) {
      next(error);
    }
  },

  getParent: async (req, res, next) => {
    try {
      const data = await Category.find({
        parentId: { $exists: false },
      });

      res.json({ data });
    } catch (error) {
      next(error);
    }
  },

  editCategory: async (req, res, next) => {
    try {
      await Category.updateOne({ _id: req.params.id }, req.body);
      res.json({ message: "edit categories" });
    } catch (error) {
      next(error);
    }
  },
  deleteCategory: async (req, res, next) => {
    try {
      await Category.findOneAndDelete({ _id: req.params.id });
      res.json({ message: "delete categories" });
    } catch (error) {
      next(error);
    }
  },
};

export default CategoryController;
