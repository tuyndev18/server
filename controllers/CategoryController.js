import Category from "../models/CategoryModel.js";
import { QueryMethod } from "../Utils/QueryMethod.js";
const CategoryController = {
  addCategory: async (req, res, next) => {
    try {
      const { label, banner } = req.body;
      const data = await Category.create({
        label,
        banner,
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
  getCategory: async (req, res, next) => {
    try {
      const query = new QueryMethod(req.query, Category.find({}))
        .pagination()
        .sort();
      const data = await query.method;
      const pageCount = Math.ceil((await Category.count()) / req.query.limit);
      res.json({ data: { data, pageCount } });
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
