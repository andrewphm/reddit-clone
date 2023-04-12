const Post = require('../models/Post');

// CREATE A NEW POST
const createPost = async (req, res) => {
  const post = new Post(req.body);
  await post.save();
  console.log('Post created: ', post);
  // Redirect to the home page
  res.redirect('/');
};

const newPost = async (req, res) => {
  res.render('posts-new');
};

const getPosts = async (req, res) => {};

const getPost = async (req, res) => {};

const updatePost = async (req, res) => {};

const deletePost = async (req, res) => {};

module.exports = {
  newPost,
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
};
