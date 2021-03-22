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

    const objectives = await ObjectiveService.getAllObjectives(query);

    return response.status(201).json({
      status: 'success',
      result: objectives.length,
      data: { objectives },
    });
  }),

  getOneObjective: catchAsyncError(async (request, response) => {
    const { objectiveId } = request.params;

    const objective = await ObjectiveService.getOneObjective(objectiveId);

    return response.status(201).json({
      status: 'success',
      data: { objective },
    });
  }),

  updateObjective: catchAsyncError(async (request, response) => {
    const { objectiveId } = request.params;

    const objective = await ObjectiveService.updateObjective(objectiveId, request.body);

    return response.status(200).json({
      status: 'success',
      data: { objective },
    });
  }),

  deleteObjective: catchAsyncError(async (request, response) => {
    const { objectiveId } = request.params;

    await ObjectiveService.deleteObjective(objectiveId);

    return response.status(204).json({
      status: 'success',
      data: null,
    });
  }),
};

module.exports = ObjectiveController;
