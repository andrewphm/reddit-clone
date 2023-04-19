const router = require('express').Router();

const {
  getPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
  newPost,
} = require('../controllers/post');

router.get('/new', newPost);
router.get('/', getPosts);
router.get('/:id', getPost);

router.post('/new', createPost);

router.put('/:id', updatePost);

router.delete('/:id', deletePost);

module.exports = router;
