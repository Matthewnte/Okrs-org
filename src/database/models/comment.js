const mongoose = require('mongoose');

const requiredField = {
  type: String,
  required: true,
};

const commentSchema = mongoose.Schema({
  comment: requiredField,
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Comment must have a lead'],
  },
});

module.exports = mongoose.model('Comment', commentSchema);
