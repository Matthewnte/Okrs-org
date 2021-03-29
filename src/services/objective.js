const Objective = require('../database/models/objective');
const FactoryService = require('./factory');

const ObjectiveService = {
  createObjective: async (data) => {
    const objective = await FactoryService.createOne(Objective, data);
    return objective;
  },
  getAllObjectives: async (query, objectiveId) => {
    const filter = { objective: objectiveId };
    const objectives = await FactoryService.getAll(Objective, query, filter);
    return objectives;
  },
  getOneObjective: async ({ objectiveId }) => {
    const populateOptions = {
      path: 'keyResult',
      select: 'name currentValue',
    };
    const objective = await FactoryService.getOne(Objective, objectiveId, populateOptions);
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
