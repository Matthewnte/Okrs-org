const NotificationController = require('../controllers/notification');
const { isAuthenticated } = require('../middleware/auth');

/**
 * @name NotificationRoute
 * @param {Object} notificationRoutes Express Router Object
 * @returns {Null} Null
 */
const NotificationRoute = (notificationRoutes) => {
  notificationRoutes
    .route('/notifications')
    .get(isAuthenticated, NotificationController.getAllNotifications);

  notificationRoutes
    .route('/notifications/:id/read')
    .patch(isAuthenticated, NotificationController.markAsRead);
};

module.exports = NotificationRoute;
