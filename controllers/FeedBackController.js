import FeedBackModel from "../models/FeedBackModel.js";
import { QueryMethod } from "../Utils/QueryMethod.js";
const FeedBackController = {
  addFeedBack: async (req, res, next) => {
    try {
      const { label, banner } = req.body;
      const data = await FeedBackModel.create({
        banner,
        label,
      });
      res.json({ data, message: "add new feedbacks" });
    } catch (error) {
      next(error);
    }
  },
  getAll: async (req, res, next) => {
    try {
      const data = await FeedBackModel.find({});
      res.json({ data });
    } catch (error) {
      next(error);
    }
  },

  getFeedBack: async (req, res, next) => {
    try {
      const query = new QueryMethod(req.query, FeedBackModel.find({}))
        .pagination()
        .sort();
      const data = await query.method;
      const pageCount = Math.ceil(
        (await FeedBackModel.count()) / req.query.limit
      );
      res.json({ data: { data, pageCount } });
    } catch (error) {
      next(error);
    }
  },
  editFeedBack: async (req, res, next) => {
    try {
      await FeedBackModel.updateOne({ _id: req.params.id }, req.body);
      res.json({ message: "edit feedbacks" });
    } catch (error) {
      next(error);
    }
  },
  deleteFeedBack: async (req, res, next) => {
    try {
      await FeedBackModel.findOneAndDelete({ _id: req.params.id });
      res.json({ message: "delete feedbacks" });
    } catch (error) {
      next(error);
    }
  },
};

export default FeedBackController;
