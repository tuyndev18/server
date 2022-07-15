import Category from "../models/CategoryModel.js";

const CategoryController = {
  addCategory: async (req, res, next) => {
    try {
      const { label, banner, description, parentId } = req.body;
      await Category.create({
        label,
        banner,
        description,
        parentId,
      });
      res.json({ message: "add new categories" });
    } catch (error) {
      next(error);
    }
  },

  getCategory: async (req, res, next) => {
    try {
      const categories = await Category.find({}).lean();
      const listCategory = categories.filter(
        (element) => element.parentId === undefined
      );
      const data = listCategory.map((value) => {
        const childCategory = categories.filter(
          (val) => val?.parentId === value._id.toString()
        );
        return {
          ...value,
          childCategory,
        };
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
