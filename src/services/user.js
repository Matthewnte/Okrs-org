const path = require('path');
const DatauriParser = require('datauri/parser');
const cloudinary = require('../config/cloudinaryConfig');
const User = require('../database/models/user');
const FactoryService = require('./factory');
const Exception = require('../helpers/exception');
const { filterUnwantedFields } = require('../helpers');

const UserService = {
  getAllUsers: async (incomingQuery) => {
    const users = await FactoryService.getAll(User, incomingQuery);
    return users;
  },

  getOneUser: async (userId) => {
    const user = await FactoryService.getOne(User, userId);
    return user;
  },

  updateMe: async ({ user, data, file }) => {
    // create Error if user post password data
    if (data.password || data.confirmPassword) {
      throw new Exception(
        "You can't update password with the route, Please use /update-password",
        400,
      );
    }

    const allowedFields = ['firstName', 'lastName', 'email'];
    const filteredBody = filterUnwantedFields(data, allowedFields);

    if (file) {
      const parser = new DatauriParser();

      if (user.photoId) await cloudinary.uploader.destroy(user.photoId);

      const image = parser.format(path.extname(file.originalname).toString(), file.buffer).content;

      const result = await cloudinary.uploader.upload(image, {
        folder: 'okr_org',
      });

      filteredBody.photo = result.secure_url;
      filteredBody.photoId = result.public_id;
    }

    const updatedUser = await FactoryService.updateOne(User, user.id, filteredBody);

    return updatedUser;
  },

  updateUser: async (userId, data) => {
    const user = await FactoryService.updateOne(User, userId, data);
    return user;
  },

  deleteMe: async (userId) => {
    await User.findOneAndUpdate(userId, { active: false });
    return null;
  },

  deleteUser: async (userId) => {
    await FactoryService.deleteOne(User, userId);
    return null;
  },
};

module.exports = UserService;
