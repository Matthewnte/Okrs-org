const catchAsyncError = require('../../helpers/catchAsyncError');
const ObjectiveService = require('../../services/objective');

const ObjectiveController = {
  createObjective: catchAsyncError(async (request, response) => {
    const newObjective = await ObjectiveService.createObjective(request.body);

    return response.status(201).json({
      status: 'successful',
      data: { objective: newObjective },
    });
  }),

  getAllObjectives: catchAsyncError(async (request, response) => {
    const { query } = request;
    let { objectiveId } = request.params;
    if (!objectiveId) objectiveId = null;

    const objectives = await ObjectiveService.getAllObjectives(query, objectiveId);

    return response.status(201).json({
      status: 'success',
      result: objectives.length,
      data: { objectives },
    });
  }),

  getOneObjective: catchAsyncError(async (request, response) => {
    const { objectiveId, subObjectiveId } = request.params;
    const data = { objectiveId };
    if (subObjectiveId) data.objectiveId = subObjectiveId;

    const objective = await ObjectiveService.getOneObjective(data);

    return response.status(201).json({
      status: 'success',
      data: { objective },
    });
  }),

  updateObjective: catchAsyncError(async (request, response) => {
    const { objectiveId, subObjectiveId } = request.params;
    const data = { objectiveId };
    if (subObjectiveId) data.objectiveId = subObjectiveId;

    const objective = await ObjectiveService.updateObjective(data, request.body);

    return response.status(200).json({
      status: 'success',
      data: { objective },
    });
  }),

  deleteObjective: catchAsyncError(async (request, response) => {
    const { objectiveId, subObjectiveId } = request.params;
    const data = { objectiveId };
    if (subObjectiveId) data.objectiveId = subObjectiveId;

    await ObjectiveService.deleteObjective(data);

    return response.status(204).json({
      status: 'success',
      data: null,
    });
  }),
};

module.exports = ObjectiveController;
