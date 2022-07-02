import SupportModel from "../models/SupportModel.js";
import { QueryMethod } from "../Utils/QueryMethod.js";
const SupportController = {
  addSupport: async (req, res, next) => {
    try {
      const { image, name, phone, email, instagram, facebook } = req.body;
      const data = await SupportModel.create({
        image,
        name,
        phone,
        email,
        instagram,
        facebook,
      });
      res.json({ data, message: "add new supports" });
    } catch (error) {
      next(error);
    }
  },

  getSupport: async (req, res, next) => {
    try {
      const query = new QueryMethod(req.query, SupportModel.find({}))
        .pagination()
        .sort();
      const data = await query.method;
      const pageCount = Math.ceil(
        (await SupportModel.count()) / req.query.limit
      );
      res.json({ data: { data, pageCount } });
    } catch (error) {
      next(error);
    }
  },
  editSupport: async (req, res, next) => {
    try {
      await SupportModel.updateOne({ _id: req.params.id }, req.body);
      res.json({ message: "edit supports" });
    } catch (error) {
      next(error);
    }
  },
  deleteSupport: async (req, res, next) => {
    try {
      await SupportModel.findOneAndDelete({ _id: req.params.id });
      res.json({ message: "delete supports" });
    } catch (error) {
      next(error);
    }
  },
};

export default SupportController;
