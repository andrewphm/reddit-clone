const router = require('express').Router();

const { getSubredditPosts } = require('../controllers/post');

router.get('/r/:subreddit', getSubredditPosts);

module.exports = router;
