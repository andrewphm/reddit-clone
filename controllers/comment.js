const Comment = require('../models/Comment');
const Post = require('../models/Post');

const createComment = async (req, res, next) => {
  try {
    const comment = new Comment(req.body);
    const savedComment = await comment.save();

    const post = await Post.findById({ _id: req.params.id });
    if (!post) {
      const error = new Error('Post not found');
      error.statusCode = 404;
      throw error;
    }

    post.comments.unshift(savedComment);
    const savedPost = await post.save();

    res.redirect(`/posts/${req.params.id}`);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createComment,
};
