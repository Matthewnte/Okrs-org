/* eslint-disable no-return-assign */
/* eslint-disable eqeqeq */
const TimeFrame = require('../database/models/timeFrame');
const FactoryService = require('./factory');

const TimeFrameService = {
  createTimeFrame: async (data) => {
    const timeFrame = await FactoryService.createOne(TimeFrame, data);
    return timeFrame;
  },

  getAllTimeFrames: async (query) => {
    const timeFrames = await FactoryService.getAll(TimeFrame, query);
    return timeFrames;
  },

  getOneTimeFrame: async (timeFrameId) => {
    const timeFrame = await FactoryService.getOne(TimeFrame, timeFrameId);
    return timeFrame;
  },

  updateTimeFrame: async (timeFrameId, data) => {
    const timeFrame = await FactoryService.updateOne(TimeFrame, timeFrameId, data);
    return timeFrame;
  },

  deleteTimeFrame: async (timeFrameId) => {
    await FactoryService.deleteOne(TimeFrame, timeFrameId);
    return null;
  },
};

module.exports = TimeFrameService;
