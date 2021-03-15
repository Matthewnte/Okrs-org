const { verifyToken } = require('./jwtHelper');

const getAccessToken = (req) => {
  let accessToken;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    [, accessToken] = req.headers.authorization.split(' ');
  }

  return accessToken;
};

const authorize = (token) => {
  const auth = { user: null, error: null };

  try {
    const error = new Error('No token is Supplied!');
    error.code = 401;
    error.subCode = 0;
    if (!token) throw error;

    auth.user = verifyToken(token);
  } catch (err) {
    console.log(err.stack);
    auth.error = err;
  }

  return auth;
};

module.exports = {
  authorize,
  getAccessToken,
};
