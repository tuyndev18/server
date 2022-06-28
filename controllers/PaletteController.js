import Palette from "../models/PaletteModel.js";
import { QueryMethod } from "../Utils/QueryMethod.js";
const PaletteController = {
  addColor: async (req, res, next) => {
    try {
      const { label, banner, category } = req.body;
      const data = await Palette.create({
        label,
        banner,
        category,
      });
      res.json({ data, message: "add new categories" });
    } catch (error) {
      next(error);
    }
  },
  findByCategory: async (req, res, next) => {
    try {
      const query = new QueryMethod(
        req.query,
        Palette.find({ category: req.params.id })
      )
        .pagination()
        .sort();
      const data = await query.method;
      const count = await Palette.find({ category: req.params.id });
      const pageCount = Math.ceil(count.length / req.query.limit);
      res.json({ data: { data, pageCount } });
    } catch (error) {
      next(error);
    }
  },
  getColor: async (req, res, next) => {
    try {
      const result = await Palette.find({ category: req.params.value }).lean();
      const data = result.map((val) => ({
        value: val.value,
        label: val.label,
      }));
      res.json({ data });
    } catch (error) {
      next(error);
    }
  },
  editColor: async (req, res, next) => {
    try {
      await Palette.updateOne({ _id: req.params.id }, req.body);
      res.json({ message: "edit categories" });
    } catch (error) {
      next(error);
    }
  },
  deleteColor: async (req, res, next) => {
    try {
      await Palette.findOneAndDelete({ _id: req.params.id });
      res.json({ message: "delete categories" });
    } catch (error) {
      next(error);
    }
  },
};

export default PaletteController;
