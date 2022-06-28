import mongoose from "mongoose";
import slug from "mongoose-slug-updater";

mongoose.plugin(slug);

const PaletteModel = new mongoose.Schema(
  {
    label: {
      type: String,
    },
    banner: {
      type: String,
    },
    value: { type: String, slug: "label", slugPaddingSize: 3, unique: true },
    category: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Palettes = mongoose.model("Palette", PaletteModel);

export default Palettes;
