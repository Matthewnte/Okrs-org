const AuthController = require('../controllers/auth');
const { isAuthenticated } = require('../middleware/auth');

/**
 * @name authRoute
 * @param {Object} authRoutes Express Router Object
 * @returns {Null} Null
 */
const authRoute = (authRoutes) => {
  authRoutes.post('/auth/signup', AuthController.signup);
  authRoutes.post('/auth/login', AuthController.login);
  // authRoutes.get('/auth/logout', AuthController.handleLogout);
  authRoutes.post('/auth/renew-token', isAuthenticated, AuthController.renewAccessToken);
  authRoutes.post('/auth/update-password', isAuthenticated, AuthController.updatePassword);
  authRoutes.post('/auth/forgot-password', AuthController.forgotPassword);
  authRoutes.patch('/auth/reset-password', isAuthenticated, AuthController.resetPassword);
};

module.exports = authRoute;
