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
  getAll: async (req, res, next) => {
    try {
      const data = await Category.find({});
      res.json({ data });
    } catch (error) {
      next(error);
    }
  },
  getChild: async (req, res, next) => {
    try {
      const data = await Category.find({ parentId: req.params.id });
      res.json({ data });
    } catch (error) {
      next(error);
    }
  },
  getSub: async (req, res, next) => {
    try {
      const result = await Category.find({ value: req.params.value });
      const convert = await Category.find({ parentId: result[0]._id }).lean();
      const data = convert.map((val) => ({
        value: val.value,
        label: val.label,
      }));
      res.json({ data });
    } catch (error) {
      next(error);
    }
  },
  getMain: async (req, res, next) => {
    try {
      const result = await Category.find({
        parentId: { $exists: false },
      }).lean();
      const data = result.map((val) => ({
        value: val.value,
        label: val.label,
      }));
      res.json({ data });
    } catch (error) {
      next(error);
    }
  },
  getCategory: async (req, res, next) => {
    try {
      const data = await Category.find({ parentId: { $exists: false } });
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
