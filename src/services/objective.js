const Objective = require('../database/models/objective');
const FactoryService = require('./factory');

const ObjectiveService = {
  createObjective: async (data) => {
    const objective = await FactoryService.createOne(Objective, data);
    return objective;
  },
  getAllObjectives: async (query) => {
    const objectives = await FactoryService.getAll(Objective, query);
    return objectives;
  },
  getOneObjective: async (objectiveId) => {
    const objective = await FactoryService.getOne(Objective, objectiveId);
    return objective;
  },
  updateObjective: async (objectiveId, data) => {
    const objective = await FactoryService.updateOne(Objective, objectiveId, data);
    return objective;
  },
  deleteObjective: async (objectiveId) => {
    await FactoryService.deleteOne(Objective, objectiveId);
    return null;
  },
};

module.exports = ObjectiveService;
