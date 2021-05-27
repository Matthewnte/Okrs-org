const NotificationController = require('../controllers/notification');
const { isAuthenticated, restrictTo } = require('../middleware/auth');

/**
 * @name NotificationRoute
 * @param {Object} notificationRoutes Express Router Object
 * @returns {Null} Null
 */
const NotificationRoute = (notificationRoutes) => {
  notificationRoutes
    .route('/notifications')
    .get(isAuthenticated, NotificationController.getAllNotifications);
};

module.exports = NotificationRoute;
