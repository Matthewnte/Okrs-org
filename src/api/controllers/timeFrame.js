const catchAsyncError = require('../../helpers/catchAsyncError');
const TimeFrameService = require('../../services/timeFrame');

const TimeFrameController = {
  createTimeFrame: catchAsyncError(async (request, response) => {
    const newTimeFrame = await TimeFrameService.createTimeFrame(request.body);

    return response.status(201).json({
      status: 'successful',
      data: { timeFrame: newTimeFrame },
    });
  }),

  getAllTimeFrames: catchAsyncError(async (request, response) => {
    const { query } = request;

    const timeFrames = await TimeFrameService.getAllTimeFrames(query);

    return response.status(201).json({
      status: 'success',
      result: timeFrames.length,
      data: { timeFrames },
    });
  }),

  getOneTimeFrame: catchAsyncError(async (request, response) => {
    const { timeFrameId } = request.params;

    const timeFrame = await TimeFrameService.getOneTimeFrame(timeFrameId);

    return response.status(201).json({
      status: 'success',
      data: { timeFrame },
    });
  }),

  updateTimeFrame: catchAsyncError(async (request, response) => {
    const { timeFrameId } = request.params;

    const timeFrame = await TimeFrameService.updateTimeFrame(timeFrameId, request.body);

    return response.status(200).json({
      status: 'success',
      data: { timeFrame },
    });
  }),

  deleteTimeFrame: catchAsyncError(async (request, response) => {
    const { timeFrameId } = request.params;

    await TimeFrameService.deleteTimeFrame(timeFrameId);

    return response.status(204).json({
      status: 'success',
      data: null,
    });
  }),
};

module.exports = TimeFrameController;
