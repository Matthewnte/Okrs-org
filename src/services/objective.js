const Objective = require('../database/models/objective');
const {
  calcAllProgress,
  calcSingleProgress,
  calcAllGroupProgress,
  calcSingleGroupProgress,
} = require('../helpers/calcPercentage');
const FactoryService = require('./factory');

const ObjectiveService = {
  createObjective: async (data) => {
    const objective = await FactoryService.createOne(Objective, data);
    return objective;
  },

  getAllObjectives: async (query, objectiveId) => {
    let updatedObjectives;
    const filter = { objective: objectiveId };
    const objectives = await FactoryService.getAll(Objective, query, filter);
    if (objectiveId === null) updatedObjectives = calcAllProgress(objectives);
    else updatedObjectives = calcAllGroupProgress(objectives);
    return updatedObjectives;
  },

  getOneObjective: async ({ objectiveId }) => {
    const populateOptions = {
      path: 'keyResult',
      select: 'name currentValue',
    };
    const objective = await FactoryService.getOne(Objective, objectiveId, populateOptions);
    if (objective.objective === null) {
      objective.progress = calcSingleProgress(objective);
    } else {
      objective.progress = calcSingleGroupProgress(objective);
    }
    await objective.save();
    return objective;
  },

  updateObjective: async ({ objectiveId }, data) => {
    const objective = await FactoryService.updateOne(Objective, objectiveId, data);
    return objective;
  },

  deleteObjective: async ({ objectiveId }) => {
    await FactoryService.deleteOne(Objective, objectiveId);
    return null;
  },
};

module.exports = ObjectiveService;
