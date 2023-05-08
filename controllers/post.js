const Post = require('../models/Post');

// CREATE A NEW POST
const createPost = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      error: 'You must be logged in to create a post',
    });
  }

  try {
    const post = new Post(req.body);
    await post.save();
    // Redirect to the home page
    return res.redirect('/posts');
  } catch {
    return res.status(400).json({
      error: 'Required fields are missing',
    });
  }
};

const newPost = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      error: 'You must be logged in to create a post',
    });
  }

  res.render('posts-new', { currentUser: req.user });
};

const getPosts = async (req, res) => {
  const currentUser = req.user;

  try {
    const posts = await Post.find({}).lean();
    res.render('posts-index', { posts, currentUser });
  } catch (error) {
    console.log(error);
  }
};

const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).lean().populate('comments');
    res.render('posts-show', { post, currentUser: req.user });
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
