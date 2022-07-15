import Discounts from "../models/DiscountModel.js";
import { QueryMethod } from "../Utils/QueryMethod.js";
const DiscountController = {
  addDiscount: async (req, res, next) => {
    try {
      const { label, banner } = req.body;
      const data = await Discounts.create({
        banner,
        label,
      });
      res.json({ data, message: "add new Discounts" });
    } catch (error) {
      next(error);
    }
  },

  getDiscount: async (req, res, next) => {
    try {
      const query = new QueryMethod(req.query, Discounts.find({}))
        .pagination()
        .sort();
      const data = await query.method;
      const pageCount = Math.ceil((await Discounts.count()) / req.query.limit);
      res.json({ data: { data, pageCount } });
    } catch (error) {
      next(error);
    }
  },
  editDiscount: async (req, res, next) => {
    try {
      await Discounts.updateOne({ _id: req.params.id }, req.body);
      res.json({ message: "edit Discounts" });
    } catch (error) {
      next(error);
    }
  },
  deleteDiscount: async (req, res, next) => {
    try {
      await Discounts.findOneAndDelete({ _id: req.params.id });
      res.json({ message: "delete Discounts" });
    } catch (error) {
      next(error);
    }
  },
};

export default DiscountController;
