const mongoose = require('mongoose');

const objectiveSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
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
    objective: {
      type: mongoose.Schema.ObjectId,
      ref: 'Objective',
      default: null,
    },
    percentageRelevance: {
      type: Number,
      default: 100,
      min: [1, 'Percentage relevance must be above 1'],
      max: [100, 'Relevance can not be above 100'],
    },
    progress: { type: Number, default: 0 },
    timeFrame: {
      type: mongoose.Schema.ObjectId,
      ref: 'TimeFrame',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

objectiveSchema.virtual('subObjectives', {
  ref: 'Objective',
  foreignField: 'objective',
  localField: '_id',
});

objectiveSchema.virtual('keyResults', {
  ref: 'KeyResult',
  foreignField: 'objective',
  localField: '_id',
});

objectiveSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'subObjectives',
    select: 'name progress',
  }).populate({
    path: 'timeFrame',
    select: 'name',
  });
  next();
});

module.exports = mongoose.model('Objective', objectiveSchema);
