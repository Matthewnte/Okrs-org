/* eslint-disable consistent-return */
const logger = require('../../config/winston');
const User = require('../../database/models/user');
const { getAccessToken, authorize } = require('../../helpers/authentication');
const Exception = require('../../helpers/exception');

const AuthMiddleware = {
  isAuthenticated: async (request, response, next) => {
    try {
      const accessToken = getAccessToken(request);
      const auth = authorize(accessToken);
      if (auth.error) {
        const { code, message, subCode } = auth.error;
        if (code === 401 && subCode === 1) {
          return response.status(code).send({ code, message });
        }

        return response.status(code).send({ code, message });
      }
      const user = await User.findById(auth.user.id).select('email role');
      request.user = user;
      next();
    } catch (error) {
      logger.info(error);
      response.status(401).json({
        status: 'failed',
        message: error.message,
      });
    }
  },

  restrictTo: (...roles) => (req, res, next) => {
    // check if user role is not included in allowed roles
    if (!roles.includes(req.user.role)) {
      throw new Exception('You do not have permission to perform this action', 403);
    }
    return next();
  },
};

module.exports = AuthMiddleware;
