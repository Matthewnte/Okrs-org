const catchAsyncError = require('../../helpers/catchAsyncError');
const NotificationService = require('../../services/notification');

const NotificationController = {
  getAllNotifications: catchAsyncError(async (request, response) => {
    const { query } = request;
    const userId = request.user.id;

    const notifications = await NotificationService.getAllNotifications(query, userId);

    return response.status(200).json({
      status: 'success',
      result: notifications.length,
      data: { notifications },
    });
  }),

  markAsRead: catchAsyncError(async (request, response) => {
    const { id } = request.params;

    const notifications = await NotificationService.markAsRead(id);

    return response.status(200).json({
      status: 'success',
      data: { notifications },
    });
  }),
};

module.exports = NotificationController;
