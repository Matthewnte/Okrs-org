const KeyResult = require('../database/models/keyResult');
const FactoryService = require('./factory');

const KeyResultService = {
  createKeyResult: async (data) => {
    const keyResult = await FactoryService.createOne(KeyResult, data);
    return keyResult;
  },
  getAllKeyResults: async (query, filter) => {
    const keyResults = await FactoryService.getAll(KeyResult, query, filter);
    return keyResults;
  },
  getOneKeyResult: async (keyResultId) => {
    const keyResult = await FactoryService.getOne(KeyResult, keyResultId);
    return keyResult;
  },
  updateKeyResult: async (keyResultId, data) => {
    const keyResult = await FactoryService.updateOne(KeyResult, keyResultId, data);
    return keyResult;
  },
  deleteKeyResult: async (keyResultId) => {
    await FactoryService.deleteOne(KeyResult, keyResultId);
    return null;
  },
};

module.exports = KeyResultService;
