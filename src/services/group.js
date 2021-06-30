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
    const populateOptions = {
      path: 'members',
      select: 'firstName lastName',
    };
    const group = await FactoryService.getOne(Group, groupId, populateOptions);
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

  addMembers: async (groupId, members) => {
    const group = await FactoryService.getOne(Group, groupId);
    const updatedMembers = [...group.members, ...members];
    group.members = updatedMembers;
    await group.save();
    return group.members;
  },

  deleteMembers: async (groupId, members) => {
    const group = await FactoryService.getOne(Group, groupId);
    const newMembersArray = group.members.toString().split(',');
    members.forEach((member) => {
      const index = newMembersArray.indexOf(member);
      if (index > -1) newMembersArray.splice(index, 1);
    });
    group.members = newMembersArray;
    await group.save();
    return group.members;
  },
};

module.exports = GroupService;
