import mongoose from "mongoose";

const InfoModel = new mongoose.Schema(
  {
    address: {
      type: String,
    },
    youtube: {
      type: String,
    },
    phone: {
      type: String,
    },
    facebook: {
      type: String,
    },
    instagram: {
      type: String,
    },
    tiktok: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Info = mongoose.model("info", InfoModel);
export default Info;
