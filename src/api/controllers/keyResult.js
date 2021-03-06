const catchAsyncError = require('../../helpers/catchAsyncError');
const KeyResultService = require('../../services/keyResult');

const KeyResultController = {
  createKeyResult: catchAsyncError(async (request, response) => {
    const { objectiveId } = request.params;
    if (!request.body.objective) request.body.objective = objectiveId;

    const newKeyResult = await KeyResultService.createKeyResult(request.body);

    return response.status(201).json({
      status: 'successful',
      data: { keyResult: newKeyResult },
    });
  }),

  getAllKeyResults: catchAsyncError(async (request, response) => {
    const { query } = request;
    const { objectiveId } = request.params;
    let filter = {};

    if (objectiveId) filter = { objective: objectiveId };
    const keyResults = await KeyResultService.getAllKeyResults(query, filter);

    return response.status(200).json({
      status: 'success',
      result: keyResults.length,
      data: { keyResults },
    });
  }),

  getOneKeyResult: catchAsyncError(async (request, response) => {
    const { keyResultId } = request.params;

    const keyResult = await KeyResultService.getOneKeyResult(keyResultId);

    return response.status(200).json({
      status: 'success',
      data: { keyResult },
    });
  }),

  updateKeyResult: catchAsyncError(async (request, response) => {
    const { keyResultId } = request.params;

    const keyResult = await KeyResultService.updateKeyResult(keyResultId, request.body);

    return response.status(200).json({
      status: 'success',
      data: { keyResult },
    });
  }),

  deleteKeyResult: catchAsyncError(async (request, response) => {
    const { keyResultId } = request.params;

    await KeyResultService.deleteKeyResult(keyResultId);

    return response.status(204).json({
      status: 'success',
      data: null,
    });
  }),
};

module.exports = KeyResultController;
