const mongoose = require('mongoose');

const requiredField = {
  type: String,
  required: true,
};

const objectiveSchema = mongoose.Schema(
  {
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
    objective: {
      type: mongoose.Schema.ObjectId,
      ref: 'Objective',
      default: null,
    },
    percentageRelevance: {
      type: Number,
      min: [1, 'Percentage relevance must be above 1'],
      max: [100, 'Relevance can not be above 100'],
    },
    progress: { type: Number, default: 0 },
    timeFrame: { min: Date.now, type: Date },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// objectiveSchema.statics.calcPercentage = async function () {
//   const stats = await this.aggregate([
//     {
//       $match: { objective: { $ne: null } },
//     },
//     {
//       $group: {
//         _id: '$owner',
//         percentageAverage: { $avg: '$progress' },
//       },
//     },
//   ]);
//   console.log(stats);
// };

objectiveSchema.virtual('subObjectives', {
  ref: 'Objective',
  foreignField: 'objective',
  localField: '_id',
});

objectiveSchema.virtual('keyResult', {
  ref: 'KeyResult',
  foreignField: 'objective',
  localField: '_id',
});

// objectiveSchema.post(/^find/, function (next) {
//   this.constructor.calcPercentage();
//   next();
// });

objectiveSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'lead',
    select: 'firstName lastName',
  })
    .populate({
      path: 'owner',
      select: 'firstName lastName',
    })
    .populate({
      path: 'subObjectives',
      select: 'name',
    });
  next();
});

module.exports = mongoose.model('Objective', objectiveSchema);
