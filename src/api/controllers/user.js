const catchAsyncError = require('../../helpers/catchAsyncError');
const UserService = require('../../services/user');

const UserController = {
  createUser: catchAsyncError(async (request, response) => {
    response.status(400).send('Route not implimented, user auth/singup route');
  }),

  getAllUsers: catchAsyncError(async (request, response) => {
    const { query } = request;
    const users = await UserService.getAllUsers(query);

    return response.status(201).json({
      status: 'success',
      result: users.length,
      data: { users },
    });
  }),

  getSingleUser: catchAsyncError(async (request, response) => {
    const { userId } = request.params;

    const user = await UserService.getOneUser(userId);

    return response.status(200).json({
      status: 'success',
      data: { user },
    });
  }),

  getMe: (request, response, next) => {
    request.params.userId = request.user.id;
    next();
  },

  updateMe: catchAsyncError(async (request, response) => {
    const userData = { user: request.user, data: request.body, file: request.file };

    const user = await UserService.updateMe(userData);

    return response.status(200).json({
      status: 'success',
      data: { user },
    });
  }),

  updateUser: catchAsyncError(async (request, response) => {
    const { userId } = request.params;

    const user = await UserService.updateUser(userId, request.body);

    return response.status(200).json({
      status: 'success',
      data: { user },
    });
  }),

  deleteMe: catchAsyncError(async (request, response) => {
    await UserService.deleteMe(request.user.id);

    return response.status(204).json({
      status: 'success',
      data: null,
    });
  }),

  deleteUser: catchAsyncError(async (request, response) => {
    const { userId } = request.params;

    await UserService.deleteUser(userId);

    return response.status(204).json({
      status: 'success',
      data: null,
    });
  }),
};

module.exports = UserController;
