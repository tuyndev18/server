import mongoose from "mongoose";
import slug from "mongoose-slug-updater";

mongoose.plugin(slug);

const AboutModel = new mongoose.Schema(
  {
    label: {
      type: String,
    },
    banner: {
      type: String,
    },
    slug: { type: String, slug: "label", slugPaddingSize: 3, unique: true },
    description: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Abouts = mongoose.model("Abouts", AboutModel);

export default Abouts;
