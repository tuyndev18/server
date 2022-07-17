import Catalogue from "../models/CatalogueModel.js";

const CatalogueController = {
  addCatalogue: async (req, res, next) => {
    try {
      const { label, banner, parentId } = req.body;
      await Catalogue.create({
        label,
        banner,
        parentId,
      });
      res.json({ message: "add new catalouges" });
    } catch (error) {
      next(error);
    }
  },

  getCatalogue: async (req, res, next) => {
    try {
      const catalogues = await Catalogue.find({}).lean();
      const listCatalogue = catalogues.filter(
        (element) => element.parentId === undefined
      );
      const data = listCatalogue.map((value) => {
        const childCatalogue = catalogues.filter(
          (val) => val?.parentId === value._id.toString()
        );
        return {
          ...value,
          childCatalogue,
        };
      });
      res.json({ data });
    } catch (error) {
      next(error);
    }
  },

  editCatalogue: async (req, res, next) => {
    try {
      await Catalogue.updateOne({ _id: req.params.id }, req.body);
      res.json({ message: "edit catalouges" });
    } catch (error) {
      next(error);
    }
  },
  deleteCatalogue: async (req, res, next) => {
    try {
      await Catalogue.findOneAndDelete({ _id: req.params.id });
      res.json({ message: "delete catalouges" });
    } catch (error) {
      next(error);
    }
  },
};

export default CatalogueController;
