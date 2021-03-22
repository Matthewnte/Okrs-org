const catchAsyncError = require('../../helpers/catchAsyncError');
const GroupService = require('../../services/group');

const GroupController = {
  createGroup: catchAsyncError(async (request, response) => {
    const newGroup = await GroupService.createGroup(request.body);

    return response.status(201).json({
      status: 'successful',
      data: { group: newGroup },
    });
  }),

  getAllGroups: catchAsyncError(async (request, response) => {
    const { query } = request;

    const groups = await GroupService.getAllGroups(query);

    return response.status(201).json({
      status: 'success',
      result: groups.length,
      data: { groups },
    });
  }),

  getOneGroup: catchAsyncError(async (request, response) => {
    const { groupId } = request.params;

    const group = await GroupService.getOneGroup(groupId);

    return response.status(201).json({
      status: 'success',
      data: { group },
    });
  }),

  updateGroup: catchAsyncError(async (request, response) => {
    const { groupId } = request.params;

    const group = await GroupService.updateGroup(groupId, request.body);

    return response.status(200).json({
      status: 'success',
      data: { group },
    });
  }),

  deleteGroup: catchAsyncError(async (request, response) => {
    const { groupId } = request.params;

    await GroupService.deleteGroup(groupId);

    return response.status(204).json({
      status: 'success',
      data: null,
    });
  }),
};

module.exports = GroupController;
