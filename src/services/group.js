const Group = require('../database/models/group');
const FactoryService = require('./factory');

const GroupService = {
  createGroup: async (data) => {
    const group = await FactoryService.createOne(Group, data);
    return group;
  },
  getAllGroups: async (query) => {
    const groups = await FactoryService.getAll(Group, query);
    return groups;
  },
  getOneGroup: async (groupId) => {
    const group = await FactoryService.getOne(Group, groupId);
    return group;
  },
  updateGroup: async (groupId, data) => {
    const group = await FactoryService.updateOne(Group, groupId, data);
    return group;
  },
  deleteGroup: async (groupId) => {
    await FactoryService.deleteOne(Group, groupId);
    return null;
  },
};

module.exports = GroupService;
