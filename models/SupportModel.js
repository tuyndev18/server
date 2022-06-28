import mongoose from "mongoose";

const SupportModel = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    image: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    instagram: {
      type: String,
    },
    facebook: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Supports = mongoose.model("Supports", SupportModel);
export default Supports;
