const { config } = require('dotenv');

config();

const JWTConfig = {
  SECRET_KEY: process.env.APP_KEY,
  ACCESS_TOKEN_LIFESPAN: '1h',
  REFRESH_TOKEN_LIFESPAN: '14d',
};

module.exports = JWTConfig;
