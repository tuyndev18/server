import mongoose from "mongoose";

const CatalogueModel = new mongoose.Schema(
  {
    label: {
      type: String,
    },
    banner: {
      type: String,
    },
    parentId: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Catalogues = mongoose.model("Catalogues", CatalogueModel);

export default Catalogues;
