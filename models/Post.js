const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    url: { type: String },
    summary: { type: String, required: true },
    subreddit: { type: String, required: true },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
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
