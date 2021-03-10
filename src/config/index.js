const dotenv = require('dotenv');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

module.exports = {
  port: process.env.PORT,
  defaultAppId: process.env.DEFAULT_APP_ID,
  appProtocol: process.env.APP_PROTOCOL,
  baseDomain: process.env.BASE_DOMAIN,

  database: {
    url: process.env.DATABASE_URL,
  },

  email: {
    userName: process.env.EMAIL_USERNAME,
    password: process.env.EMAIL_PASSWORD,
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
  },
};
