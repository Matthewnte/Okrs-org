const UserController = require('../controllers/user');
const { isAuthenticated } = require('../middleware/auth');
const { uploadSingle } = require('../middleware/multer');

/**
 * @name userRoute
 * @param {Object} userRoutes Express Router Object
 * @returns {Null} Null
 */
const userRoute = (userRoutes) => {
  userRoutes
    .route('/users')
    .get(isAuthenticated, UserController.getAllUsers)
    .post(isAuthenticated, UserController.createUser);
  userRoutes
    .route('/users/me')
    .get(isAuthenticated, UserController.getMe, UserController.getSingleUser)
    .patch(isAuthenticated, uploadSingle, UserController.updateMe)
    .delete(isAuthenticated, UserController.deleteMe);
  userRoutes
    .route('/users/:userId')
    .get(isAuthenticated, UserController.getSingleUser)
    .patch(isAuthenticated, UserController.updateUser)
    .delete(isAuthenticated, UserController.deleteUser);
};

module.exports = userRoute;
