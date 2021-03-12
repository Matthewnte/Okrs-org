import logger from '../config/winston';

import { getAccessToken, authorize } from '../helpers/authentication';

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
      request.user = auth.user;
      next();
    } catch (error) {
      logger.info(error);
      response.status(401).json({
        status: 'failed',
        message: error.response.data.message || error.message,
      });
    }
  },

  restrictTo: (role) => (request, response, next) => {
    const userRole = request.user.roles || [];
    if (!userRole.includes(role)) {
      return response.status(403).json({
        status: 'failed',
        message: 'You do not have permission to perform this action',
      });
    }
    next();
  },
};

export default AuthMiddleware;
