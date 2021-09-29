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
    sender: process.env.EMAIL_SENDER || 'admin@okr.com',
    okr: 'Wehaul247logistics@gmail.com',
  },

  cloudinary: {
    name: process.env.CLOUDINARY_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },

  pusher: {
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER,
  },

  admin: {
    id: process.env.ADMIN_ID,
  },

  oauth2: {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI,
    refreshToken: process.env.REFRESH_TOKEN,
  },
};
