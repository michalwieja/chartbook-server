import Post from "../models/PostModel.js";

export const getPosts = (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then((posts) => res.json(posts))
    .catch((err) => console.log(err));
};

export const createPost = (req, res) => {
  const newPost = new Post({
    symbol: req.body.symbol,
    desc: req.body.desc,
    author: req.body.author,
  });
  newPost.save().then((item) => res.json(item));
};
export const editPost = (req, res) => {
  const id = req.params.id;
  const updatedPost = {
    symbol: req.body.symbol,
    desc: req.body.desc,
    author: req.body.author,
  };
  Post.findByIdAndUpdate(id, updatedPost, { new: true })
    .then(res.json("updated"))
    .catch((err) => console.log(err));
};
export const deletePost = (req, res) => {
  const id = req.params.id;

  Post.findByIdAndDelete(id).then(res.json("deleted"));
};
