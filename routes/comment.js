const router = require('express').Router({ mergeParams: true });

const { createReplyToComment } = require('../controllers/comment');

router.get('/posts/:postId/comments/:commentId/replies/new', (req, res) => {
  res.render('replies-new', { postId: req.params.postId, commentId: req.params.commentId });
});

router.post('/posts/:postId/comments/:commentId/replies', createReplyToComment);

module.exports = router;
