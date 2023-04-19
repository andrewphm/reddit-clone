const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    url: { type: String, required: true },
    summary: { type: String, required: true },
    subreddit: { type: String, required: true },
  },
  { timestamps: true }
);

let Post;

if (mongoose.models.Post) {
  Post = mongoose.model('Post');
} else {
  Post = mongoose.model('Post', PostSchema);
}

module.exports = Post;
