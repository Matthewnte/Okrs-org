const mongoose = require('mongoose');

const requiredField = {
  type: String,
  required: true,
};

const objectiveSchema = mongoose.Schema({
  name: requiredField,
  description: requiredField,
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'An Objective must have a owner',
  },
  lead: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'An Objective must have a lead',
  },
  status: {
    type: String,
    enum: ['draft', 'active', 'close', 'all'],
    default: 'draft',
  },
  timeFrame: { min: Date.now, type: Date },
});

objectiveSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'lead',
    select: 'firstName lastName',
  }).populate({
    path: 'owner',
    select: 'firstName lastName',
  });
  next();
});

module.exports = mongoose.model('Objective', objectiveSchema);
