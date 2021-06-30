const mongoose = require('mongoose');
const commentSchema = require('./comment');
const Objective = require('./objective');

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
  });
  next();
});

const getSubObjectiveProgress = function (objective) {
  if (objective.subObjectives.length > 0) {
    const subObjectiveProgress = objective.subObjectives.reduce(
      (result, subObjective) => result + parseInt(subObjective.progress),
      0,
    );
    const subObjectiveLength = objective.subObjectives.length;

    const subObjectiveAverage = subObjectiveProgress / subObjectiveLength;

    return (objective.percentageRelevance / 100) * subObjectiveAverage;
  }

  return null;
};

const getKeyResultAverage = function (objective) {
  if (objective.keyResults && objective.keyResults.length > 0) {
    return (
      objective.keyResults.reduce(
        (total, keyResult) => total + parseInt(keyResult.currentValue),
        0,
      ) / objective.keyResults.length
    );
  }
  return null;
};

const updateParentObjectives = async function (objective) {
  if (!objective.objective) return;

  const parentObjective = await Objective.findOne({ _id: objective.objective });
  const keyResultAverage = getKeyResultAverage(parentObjective);

  const subObjectiveProgress = getSubObjectiveProgress(parentObjective);

  let dividBy = 2;
  if (keyResultAverage === null || getSubObjectiveProgress === null) dividBy = 1;
  parentObjective.progress = Math.ceil(keyResultAverage + subObjectiveProgress / dividBy);

  parentObjective.save();
  updateParentObjectives(parentObjective);
};

const updateProgress = async function () {
  const objective = await Objective.findOne({ _id: this.objective });

  const keyResultAverage = getKeyResultAverage(objective);

  const subObjectiveProgress = getSubObjectiveProgress(objective);

  let dividBy = 2;
  if (keyResultAverage === null || getSubObjectiveProgress === null) dividBy = 1;
  objective.progress = Math.ceil(keyResultAverage + subObjectiveProgress / dividBy);

  updateParentObjectives(objective);

  await objective.save();
};

keyResultSchema.post('save', updateProgress);

module.exports = mongoose.model('KeyResult', keyResultSchema);
