require('dotenv').config();

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  port: process.env.PORT,
  defaultAppId: process.env.DEFAULT_APP_ID,
  appProtocol: process.env.APP_PROTOCOL,
  baseDomain: process.env.BASE_DOMAIN,

  database: {
    url: process.env.DB_URL,
    password: process.env.DB_PASSWORD,
  },

  email: {
    userName: process.env.EMAIL_USERNAME,
    password: process.env.EMAIL_PASSWORD,
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
  },

  cloudinary: {
    name: process.env.CLOUDINARY_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },
};
