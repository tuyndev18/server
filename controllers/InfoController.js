import InfoModel from "../models/InfoModel.js";
const InfoController = {
  getInfo: async (req, res, next) => {
    try {
      const data = await InfoModel.find({});
      res.json({ data: data[0] });
    } catch (error) {
      next(error);
    }
  },
  editInfo: async (req, res, next) => {
    try {
      await InfoModel.updateOne({ _id: req.params.id }, req.body);
      res.json({ message: "edit info" });
    } catch (error) {
      next(error);
    }
  },
};

export default InfoController;
