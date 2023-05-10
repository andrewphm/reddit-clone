const Comment = require('../models/Comment');
const Post = require('../models/Post');

const createReply = (req) => {
  if (!req.user) {
    const error = new Error('You must be logged in to reply to a comment');
    error.statusCode = 403;
    throw error;
  }

  const reply = new Comment(req.body);
  reply.author = req.user._id;
  return reply;
};

const findPostAndComment = async (postId, commentId) => {
  const post = await Post.findById(postId);
  const comment = await Comment.findById(commentId);
  return { post, comment };
};

const saveReplyAndUpdateComment = async (reply, comment) => {
  const savedReply = await reply.save();
  comment.comments.unshift(savedReply._id);
  await comment.save();
};

const createReplyToComment = async (req, res, next) => {
  try {
    const { postId, commentId } = req.params;
    const reply = createReply(req);
    const { post, comment } = await findPostAndComment(postId, commentId);
    await saveReplyAndUpdateComment(reply, comment);

    return res.redirect(`/posts/${post._id}`);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const createComment = async (req, res, next) => {
  try {
    const comment = new Comment(req.body);
    comment.author = req.user._id;
    const savedComment = await comment.save();

    const post = await Post.findById({ _id: req.params.id });
    if (!post) {
      const error = new Error('Post not found');
      error.statusCode = 404;
      throw error;
    }

    post.comments.unshift(savedComment);
    const savedPost = await post.save();
    console.log(savedPost);

    return res.redirect(`/posts/${req.params.id}`);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  createComment,
  createReplyToComment,
};
