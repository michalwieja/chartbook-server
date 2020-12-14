import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    symbol: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      // required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    likeCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
