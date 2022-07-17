import AboutModel from "../models/AboutModel.js";
import { QueryMethod } from "../Utils/QueryMethod.js";

const AboutController = {
  addAbout: async (req, res, next) => {
    try {
      const { label, banner, description } = req.body;
      await AboutModel.create({
        label,
        banner,
        description,
      });
      res.json({ message: "add new abouts" });
    } catch (error) {
      next(error);
    }
  },
  getAbout: async (req, res, next) => {
    try {
      const query = new QueryMethod(req.query, AboutModel.find({}))
        .pagination()
        .sort();
      const data = await query.method;
      const pageCount = Math.ceil((await AboutModel.count()) / req.query.limit);
      res.json({ data: { data, pageCount } });
    } catch (error) {
      next(error);
    }
  },
  getSlug: async (req, res, next) => {
    try {
      const result = await AboutModel.find({});
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
  getMainAbout: async (req, res, next) => {
    try {
      const data = await AboutModel.find({ isMain: { $exists: true } });
      const relative = await AboutModel.find({
        isMain: { $exists: false },
      }).limit(6);

      res.json({ data: { data, relative } });
    } catch (error) {
      next(error);
    }
  },
  getAboutBySlug: async (req, res, next) => {
    try {
      const data = await AboutModel.find({ slug: req.params.slug });
      const relative = await AboutModel.find({
        slug: { $ne: req.params.slug },
      }).limit(6);
      res.json({ data: { data, relative } });
    } catch (error) {
      next(error);
    }
  },

  editAbout: async (req, res, next) => {
    try {
      await AboutModel.updateOne({ _id: req.params.id }, req.body);
      res.json({ message: "edit abouts" });
    } catch (error) {
      next(error);
    }
  },
  deleteAbout: async (req, res, next) => {
    try {
      await AboutModel.findOneAndDelete({ _id: req.params.id });
      res.json({ message: "delete abouts" });
    } catch (error) {
      next(error);
    }
  },
};

export default AboutController;
