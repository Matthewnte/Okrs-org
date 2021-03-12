/* eslint-disable require-jsdoc */
const jwt = require('jsonwebtoken');
const JWTConfig = require('../config/jwtConfig');
const User = require('../database/models/user');

/**
 *
 * @type {{renewAccessToken: renewAccessToken,
 * generateTokens:(function(Object): {access: string, refresh: string})}}
 */
const JWTHelper = (() => {
  const refreshTokenList = {};
  /**
   *
   * @param {Object} user
   * @param {string} lifeSpan
   * @returns {undefined|string} The generated token string
   */
  const makeToken = (user, lifeSpan = JWTConfig.ACCESS_TOKEN_LIFESPAN) =>
    jwt.sign(user, JWTConfig.SECRET_KEY, { expiresIn: lifeSpan });
  /**
   *
   * @param {Object} user
   * @returns {{access: string, refresh: string}}
   * The generated token object containing access token and refresh token
   */
  const generateTokens = (user) => {
    const access = makeToken(user);
    const refresh = makeToken(user, JWTConfig.REFRESH_TOKEN_LIFESPAN);
    refreshTokenList[refresh] = access;
    return { access, refresh };
  };

  const removeTokenFromRefereshList = (token) => {
    delete refreshTokenList[token];
    return null;
  };

  /**
   *
   * @param {string} oldToken
   * @param {string} refreshToken
   * @returns {string} The new access token
   */
  const renewAccessToken = async (oldToken, refreshToken) => {
    if (!oldToken || !refreshToken) {
      throw new Error('Invalid arguments: provide user and refresh token');
    }

    const refreshTokenExist = refreshToken in refreshTokenList;
    const oldTokenExist = refreshTokenList[refreshToken] === oldToken;
    if (refreshTokenExist && !oldTokenExist) {
      throw new Error('Invalid old token: supplied old access token cannot be found');
    }
    const user = JWTHelper.verifyToken(refreshToken, false);
    if (user && user.id) {
      removeTokenFromRefereshList(refreshToken);
      const { id, userName, email, roles } = await User.findOne(user.id);
      const { access, refresh } = generateTokens({
        id,
        userName,
        email,
        roles,
      });
      refreshTokenList[refresh] = access;
      return { access, refresh };
    }
    throw new Error('Invalid refresh token: supplied token is invalid');
  };

  /**
   * @param {String} token the access token string
   * @param {Boolean} includeSignature
   * @return {Object} the user object
   */
  const verifyToken = (token, includeSignature = true) => {
    let user = {};
    jwt.verify(token, JWTConfig.SECRET_KEY, (err, decoded) => {
      if (err) {
        const errorObject = {
          code: 401,
          subCode: 0,
          message: 'Unauthorized!',
          stack: err.stack,
        };
        switch (err.name) {
          case 'TokenExpiredError':
            errorObject.message = 'Supplied token has expired!';
            errorObject.subCode = 1;
            break;
          case 'JsonWebTokenError':
            errorObject.message = 'Supplied token is invalid!';
            break;
          default:
            break;
        }
        throw errorObject;
      }
      user = decoded;
      if (!includeSignature) {
        delete user.iat; // Delete the issuedAt field
        delete user.exp; // Delete the expireAt field
      }
    });
    return user;
  };

  return {
    generateTokens,
    renewAccessToken,
    verifyToken,
    removeTokenFromRefereshList,
  };
})();

module.exports = JWTHelper;
