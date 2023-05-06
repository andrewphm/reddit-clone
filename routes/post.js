const router = require('express').Router();

const {
  getPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
  newPost,
} = require('../controllers/post');

const { createComment } = require('../controllers/comment');

router.get('/new', newPost);
router.get('/', getPosts);
router.get('/:id', getPost);

router.post('/new', createPost);

router.put('/:id', updatePost);
router.post('/:id/comments', createComment);

router.delete('/:id', deletePost);

router.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({ error: err.message });
});

module.exports = router;
