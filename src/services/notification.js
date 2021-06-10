const Notification = require('../database/models/notification');
const FactoryService = require('./factory');

const NotificationService = {
  getAllNotifications: async (query, userId) => {
    const filter = { recepientUserId: { $in: [userId] } };
    const notifications = await FactoryService.getAll(Notification, query, filter);
    return notifications;
  },
};

module.exports = NotificationService;
