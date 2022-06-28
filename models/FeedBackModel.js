import mongoose from "mongoose";

const FeedBackModel = new mongoose.Schema(
  {
    label: {
      type: String,
    },
    banner: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const FeedBacks = mongoose.model("FeedBacks", FeedBackModel);
export default FeedBacks;
