const Objective = require('../database/models/objective');
const FactoryService = require('./factory');
const Notification = require('../database/models/notification');
const { admin } = require('../config');

const ObjectiveService = {
  createObjective: async (data, userId) => {
    const objective = await FactoryService.createOne(Objective, data);
    await Notification.create({
      type: 'objective',
      initiatorUserId: userId,
      recepientUserId: [admin.id, objective.lead],
      entity: objective._id,
    });
    return objective;
  },

  getAllObjectives: async (query, objectiveId) => {
    const filter = { objective: objectiveId };
    const objectives = await FactoryService.getAll(Objective, query, filter);
    return objectives;
  },

  getOneObjective: async ({ objectiveId }) => {
    const populateOptions = {
      path: 'keyResults',
      select: '-__v -startValue -targetValue -description -lead -comments',
    };
    const objective = await FactoryService.getOne(Objective, objectiveId, populateOptions);

    return objective;
  },

  updateObjective: async ({ objectiveId }, data, userId) => {
    const objective = await FactoryService.updateOne(Objective, objectiveId, data);
    await Notification.create({
      type: 'objective',
      initiatorUserId: userId,
      recepientUserId: [admin.id, objective.lead],
      entity: objectiveId,
    });
    return objective;
  },

  deleteObjective: async ({ objectiveId }) => {
    await FactoryService.deleteOne(Objective, objectiveId);
    return null;
  },
};

module.exports = ObjectiveService;
