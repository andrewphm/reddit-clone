const { Schema, model } = require('mongoose');

const autoPopulate = require('../utils/autopopulate');

const commentSchema = new Schema(
  {
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

commentSchema.pre('findOne', autoPopulate('author')).pre('find', autoPopulate('author'));

module.exports = model('Comment', commentSchema);
