/* eslint-disable func-names */
const mongoose = require('mongoose');
const validate = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = mongoose.Schema(
  {
    firstName: { type: String, required: 'User must have first name' },
    lastName: { type: String, required: 'User must have last name' },
    email: {
      type: String,
      required: 'Email is required',
      unique: true,
      lowercase: true,
      validate: [validate.isEmail, 'Please enter a valid email'],
    },
    role: { type: String, enum: ['user', 'admin', 'lead'], default: 'user' },
    photo: {
      type: String,
      default:
        'https://res.cloudinary.com/daygucgkt/image/upload/v1602758572/blank-profile-picture-973460_1280_gbyj3p.png',
    },
    photoId: String,
    password: {
      type: String,
      required: 'Password is required',
      minlength: [8, 'Password must be atleast 8 characters'],
      select: false,
    },
    jobTitle: {
      type: String,
    },
    admin: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: 'A User must belong to an admin',
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

userSchema.virtual('groups', {
  ref: 'Group',
  foreignField: 'members',
  localField: '_id',
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  return next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  return next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.checkPassword = async function (password, userPassword) {
  const isCorrectPassword = await bcrypt.compare(password, userPassword);
  return isCorrectPassword;
};

userSchema.methods.hasChangePassword = function (jwtTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return jwtTimestamp < changedTimestamp;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

module.exports = mongoose.model('User', userSchema);
