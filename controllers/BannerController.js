import Banners from "../models/BannerModel.js";
import { QueryMethod } from "../Utils/QueryMethod.js";
const BannerController = {
  addBanner: async (req, res, next) => {
    try {
      const { title, banner } = req.body;
      const data = await Banners.create({
        banner,
        title,
      });
      res.json({ data, message: "add new banners" });
    } catch (error) {
      next(error);
    }
  },
  getAll: async (req, res, next) => {
    try {
      const data = await Banners.find({});
      res.json({ data });
    } catch (error) {
      next(error);
    }
  },

  getBanner: async (req, res, next) => {
    try {
      const query = new QueryMethod(req.query, Banners.find({}))
        .pagination()
        .sort();
      const data = await query.method;
      const pageCount = Math.ceil((await Banners.count()) / req.query.limit);
      res.json({ data: { data, pageCount } });
    } catch (error) {
      next(error);
    }
  },
  editBanner: async (req, res, next) => {
    try {
      await Banners.updateOne({ _id: req.params.id }, req.body);
      res.json({ message: "edit banners" });
    } catch (error) {
      next(error);
    }
  },
  deleteBanner: async (req, res, next) => {
    try {
      await Banners.findOneAndDelete({ _id: req.params.id });
      res.json({ message: "delete banners" });
    } catch (error) {
      next(error);
    }
  },
};

export default BannerController;
