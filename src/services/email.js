import nodemailer from 'nodemailer';
import { email } from '../config';

/**
 * @description Send email service
 * @param {Object} options
 * @returns {Promise<void>} Null
 */
const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: email.host,
    port: email.port,
    auth: {
      user: email.userName,
      pass: email.password,
    },
  });

  const mailOptions = {
    from: 'Otomax <admin@otomax.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
