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
};

module.exports = NotificationController;
