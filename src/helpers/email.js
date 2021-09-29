const nodemailer = require('nodemailer');
const htmlToText = require('html-to-text');
const { google } = require('googleapis');
const { email, oauth2 } = require('../config');
const logger = require('../config/winston');

const createTransport = async () => {
  // Create a transporter
  const oAuth2Client = new google.auth.OAuth2(
    oauth2.clientId,
    oauth2.clientSecret,
    oauth2.redirectUri,
  );

  oAuth2Client.setCredentials({
    refresh_token: oauth2.refreshToken,
  });

  const accessToken = await oAuth2Client.getAccessToken();

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: email.okr,
      clientId: oauth2.clientId,
      clientSecret: oauth2.clientSecret,
      refreshToken: oauth2.refreshToken,
      accessToken,
    },
  });
};

const sendEmail = async (options) => {
  logger.info('Sending email');
  const transporter = await createTransport();

  const mailOptions = {
    from: `OKR <${email.sender}>`,
    to: options.email,
    subject: options.subject,
    html: options.message,
    text: htmlToText.fromString(options.message),
  };

  await transporter.sendMail(mailOptions);
  logger.info('Email sent');
};

module.exports = sendEmail;
