const TimeFrameController = require('../controllers/timeFrame');
const { isAuthenticated } = require('../middleware/auth');

/**
 * @name timeFrameRoute
 * @param {Object} timeFrameRoutes Express Router Object
 * @returns {Null} Null
 */
const timeFrameRoute = (timeFrameRoutes) => {
  timeFrameRoutes
    .route('/time-frames')
    .get(isAuthenticated, TimeFrameController.getAllTimeFrames)
    .post(isAuthenticated, TimeFrameController.createTimeFrame);
  timeFrameRoutes
    .route('/time-frames/:timeFrameId')
    .get(isAuthenticated, TimeFrameController.getOneTimeFrame)
    .patch(isAuthenticated, TimeFrameController.updateTimeFrame)
    .delete(isAuthenticated, TimeFrameController.deleteTimeFrame);
};

module.exports = timeFrameRoute;
