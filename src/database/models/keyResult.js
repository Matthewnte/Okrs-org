const mongoose = require('mongoose');
const commentSchema = require('./comment');

const requiredField = {
  type: String,
  required: true,
};

const keyResultSchema = mongoose.Schema({
  name: requiredField,
  description: requiredField,
  lead: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'A keyResult must have a lead',
  },
  objective: {
    type: mongoose.Schema.ObjectId,
    ref: 'Objective',
    required: 'A keyResult must belong to an objective',
  },
  comments: [commentSchema],
  measureAs: { ...requiredField, enum: ['numberical', 'percentage', 'currency'] },
  startValue: requiredField,
  status: {
    type: String,
    enum: ['none', 'needsAttention', 'offTrack', 'onTrack'],
    default: 'none',
  },
  currentValue: requiredField,
  targetValue: requiredField,
});

keyResultSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'lead',
    select: 'firstName lastName',
  }).populate({
    path: 'objective',
    select: '-owner -lead -description -timeFrame -__v -status',
  });
  next();
});

module.exports = mongoose.model('KeyResult', keyResultSchema);
