import Palettes from "../models/PaletteModel.js";
import Products from "../models/ProductModel.js";
import { QueryMethod } from "../Utils/QueryMethod.js";

const ProductController = {
  addProducts: async (req, res, next) => {
    try {
      const {
        category,
        title,
        description,
        detail,
        gallery,
        color,
        type,
        subCategory,
        texture,
      } = req.body;
      const data = await Products.create({
        category,
        title,
        description,
        detail,
        gallery,
        color,
        type,
        subCategory,
        texture,
      });
      res.json({ data, message: "add new products" });
    } catch (error) {
      next(error);
    }
  },

  getAll: async (req, res, next) => {
    try {
      const resultFilter = new QueryMethod(req.query, Products).filter();
      const query = new QueryMethod(req.query, Products)
        .filter()
        .pagination()
        .sort();
      const data = await query.method;
      const page = await resultFilter.method;
      res.json({
        data: { data, pageCount: Math.ceil(page.length / req.query.limit) },
      });
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

      const same = await Products.find({
        "subCategory.value": data[0].subCategory.value,
      });
      const mergeColor = same.map(async (product) => {
        const getColor = await Palettes.find({
          value: product.color.value,
          category: product.category.value,
        });
        return {
          slug: product.slug,
          banner: getColor[0]?.banner,
        };
      });
      const color = await Promise.all(mergeColor);
      const latest = await Products.find({})
        .sort({ createdAt: "desc" })
        .limit(8);
      res.json({
        data: {
          color,
          products: data[0],
          categories: {
            title: same < 4 ? "Products of the same type" : "Latest Product",
            data: same < 4 ? same : latest,
          },
        },
      });
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
