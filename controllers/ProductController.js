import Products from "../models/ProductModel.js";
import { QueryMethod } from "../Utils/QueryMethod.js";

const ProductController = {
  addProducts: async (req, res, next) => {
    try {
      const { categories, title, description, detail, gallery, price } =
        req.body;
      const data = await Products.create({
        categories,
        title,
        description,
        detail,
        gallery,
        price,
      });
      res.json({ data, message: "add new products" });
    } catch (error) {
      next(error);
    }
  },

  getProducts: async (req, res, next) => {
    try {
      const query = new QueryMethod(req.query, Products.find({}))
        .pagination()
        .sort();
      const data = await query.method;
      const pageCount = Math.ceil((await Products.count()) / req.query.limit);
      res.json({ data: { data, pageCount } });
    } catch (error) {
      next(error);
    }
  },
  getAll: async (req, res, next) => {
    try {
      const data = await Products.find({})
        .limit(10)
        .sort({ createdAt: "desc" });
      res.json({ data });
    } catch (error) {
      next(error);
    }
  },
  getSlug: async (req, res, next) => {
    try {
      const data = await Products.find({}, { slug: 1 });
      res.json({ data });
    } catch (error) {
      next(error);
    }
  },
  getProductBySlug: async (req, res, next) => {
    try {
      const { slug } = req.params;
      const data = await Products.find({ slug });
      res.json({ data });
    } catch (error) {
      next(error);
    }
  },
  editProducts: async (req, res, next) => {
    try {
      await Products.updateOne({ _id: req.params.id }, req.body);
      res.json({ message: "edit products" });
    } catch (error) {
      next(error);
    }
  },
  deleteProducts: async (req, res, next) => {
    try {
      await Products.findOneAndDelete({ _id: req.params.id });
      res.json({ message: "delete products" });
    } catch (error) {
      next(error);
    }
  },
};

export default ProductController;
