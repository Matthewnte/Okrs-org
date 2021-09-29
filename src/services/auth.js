/* eslint-disable no-underscore-dangle */
const crypto = require('crypto');
const User = require('../database/models/user');
const Exception = require('../helpers/exception');
const JWTHelper = require('../helpers/jwtHelper');
const sendEmail = require('../helpers/email');

const AuthService = {
  userSignup: async (userData) => {
    const user = await User.create(userData);

    const { accessToken, refreshToken } = JWTHelper.generateTokens({
      id: user._id,
      email: user.email,
      roles: user.role,
    });

    try {
      const message = `Here's your temporary OKR password - ${userData.password}`;

      await sendEmail({
        email: userData.email,
        subject: 'Temporary OKR password',
        message,
      });
    } catch (error) {
      await User.findByIdAndDelete(user._id);
      throw new Exception('There was an error sending this mail, Try again later', 500);
    }

    return { accessToken, refreshToken };
  },

  userLogin: async ({ email, password }) => {
    if (!email || !password) {
      throw new Exception('Please provide email and password', 400);
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.checkPassword(password, user.password))) {
      throw new Exception('Incorrect email or password', 401);
    }

    const { accessToken, refreshToken } = JWTHelper.generateTokens({
      id: user._id,
      email: user.email,
      roles: user.role,
    });

    return { accessToken, refreshToken };
  },

  updatePassword: async ({ currentPassword, newPassword, userId }) => {
    if (!currentPassword || !newPassword) throw new Exception('Please enter password details', 400);

    const user = await User.findById(userId).select('+password');

    if (!(await user.checkPassword(currentPassword, user.password))) {
      throw new Exception('You entered a wrong password', 401);
    }

    user.password = newPassword;
    await user.save();

    return user;
  },

  renewAccessToken: async ({ oldToken, refreshToken }) => {
    if (!!oldToken && !!refreshToken) {
      try {
        const { access, refresh } = await JWTHelper.renewAccessToken(oldToken, refreshToken);

        console.log({ access });
        console.log({ refresh });

        return { access, refresh };
      } catch (e) {
        throw new Exception(e.message, 400);
      }
    } else {
      throw new Exception('Old token and refresh token required!', 422);
    }
  },

  forgotPassword: async (email, url) => {
    const user = await User.findOne({ email });

    if (!user) throw new Exception('There is no user with that email address');

    // Generete random reset token
    const resetToken = user.createPasswordResetToken();
    user.save({ validateBeforeSave: false });

    // Send resetToken to user email
    const resetUrl = `${url}/${resetToken}`;

    const message = `Hello ${user.firstName}, \nsomeone just requested to change your password. You can do this through the link below.\n${resetUrl}\nIf you didn't request this, please ignore this email. Your password will stay safe and won't be changed.`;

    try {
      await sendEmail({
        email: user.email,
        subject: 'Reset password instructions',
        message,
      });
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });

      throw new Exception('There was an error sending this mail, Try again later', 500);
    }
  },

  resetPassword: async (token, password) => {
    // Get user based on token
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    // Verify token and user, then set new password
    if (!user) throw new Exception('Token is invalid or has expired', 400);
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
  },
};

module.exports = AuthService;
