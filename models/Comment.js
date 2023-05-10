const { Schema, model } = require('mongoose');

const autoPopulate = require('../utils/autopopulate');

const commentSchema = new Schema(
  {
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  },
  { timestamps: true }
);

commentSchema
  .pre('findOne', autoPopulate('author'))
  .pre('find', autoPopulate('author'))
  .pre('findOne', autoPopulate('comments'))
  .pre('find', autoPopulate('comments'));

module.exports = model('Comment', commentSchema);
