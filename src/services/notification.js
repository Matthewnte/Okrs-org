const Notification = require('../database/models/notification');
const FactoryService = require('./factory');

const NotificationService = {
  getAllNotifications: async (query, userId) => {
    const filter = { recepientUserId: { $in: ['6063e42c57c79e275848320b'] } };
    const notifications = await FactoryService.getAll(Notification, query, filter);
    console.log(notifications);
    return notifications;
  },
};

module.exports = NotificationService;
