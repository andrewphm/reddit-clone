const Post = require('../models/Post');

// CREATE A NEW POST
const createPost = async (req, res) => {
  const post = new Post(req.body);
  await post.save();
  // Redirect to the home page
  res.redirect('/posts');
};

const newPost = async (req, res) => {
  res.render('posts-new');
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).lean();
    res.render('posts-index', { posts });
  } catch (error) {
    console.log(error);
  }
};

const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).lean();
    res.render('posts-show', { post });
  } catch (error) {}
};

const updatePost = async (req, res) => {};

const deletePost = async (req, res) => {};

const getSubredditPosts = async (req, res) => {
  try {
    const posts = await Post.find({ subreddit: req.params.subreddit }).lean();
    return res.render('posts-index', { posts });
  } catch (error) {
    return res.status(404).json({
      error: 'No subreddit found with that name',
    });
  }
};

module.exports = {
  newPost,
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
  getSubredditPosts,
};
