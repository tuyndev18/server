import VideoModel from "../models/VideoModel.js";
import { QueryMethod } from "../Utils/QueryMethod.js";

const VideoController = {
  addVideo: async (req, res, next) => {
    try {
      const { label, banner, description } = req.body;
      await VideoModel.create({
        label,
        banner,
        description,
      });
      res.json({ message: "add new video" });
    } catch (error) {
      next(error);
    }
  },
  getVideo: async (req, res, next) => {
    try {
      const query = new QueryMethod(req.query, VideoModel.find({}))
        .pagination()
        .sort();
      const data = await query.method;
      const pageCount = Math.ceil((await VideoModel.count()) / req.query.limit);
      res.json({ data: { data, pageCount } });
    } catch (error) {
      next(error);
    }
  },
  getSlug: async (req, res, next) => {
    try {
      const result = await VideoModel.find({});
      const data = result.map((val) => {
        return {
          slug: val.slug,
        };
      });
      res.json({ data });
    } catch (error) {
      next(error);
    }
  },
  getVideoBySlug: async (req, res, next) => {
    try {
      const data = await VideoModel.find({ slug: req.params.slug });
      const relative = await VideoModel.find({
        slug: { $ne: req.params.slug },
      }).limit(6);
      res.json({ data: { data, relative } });
    } catch (error) {
      next(error);
    }
  },

  editVideo: async (req, res, next) => {
    try {
      await VideoModel.updateOne({ _id: req.params.id }, req.body);
      res.json({ message: "edit video" });
    } catch (error) {
      next(error);
    }
  },
  deleteVideo: async (req, res, next) => {
    try {
      await VideoModel.findOneAndDelete({ _id: req.params.id });
      res.json({ message: "delete video" });
    } catch (error) {
      next(error);
    }
  },
};

export default VideoController;
