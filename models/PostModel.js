import mongoose from "mongoose";
import slug from "mongoose-slug-generator";

const options = {
  separator: "",
  lang: "en",
  truncate: 100,
};
mongoose.plugin(slug, options);

const postSchema = new mongoose.Schema(
  {
    title: { type: String },
    content: { type: String },
    banner: {
      type: String,
    },
    slug: { type: String, slug: "title", slug_padding_size: 3, unique: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Posts = mongoose.model("Posts", postSchema);
export default Posts;
