const path = require('path');
const cloudinary = require('cloudinary').v2;
const DatauriParser = require('datauri/parser');
const User = require('../../database/models/user');
const catchAsync = require('../../helpers/catchAsyncError');
const Exception = require('../../helpers/exception');
const { filterObj } = require('../middleware');

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

// exports.updateMe = catchAsync(async (req, res, next) => {
//   // Instantiate parser
//   const parser = new DatauriParser();

//   // create Error if user post password data
//   if (req.body.password || req.body.confirmPassword) {
//     return next(
//       new Exception("You can't update password with the route, Please use /updatePassword", 400),
//     );
//   }

//   // FILTER unwanted field names that are not allowed to be updated
//   const allowedFields = ['firstName', 'lastName', 'email', 'category'];
//   const filteredBody = filterObj(req.body, allowedFields);

//   if (req.file) {
//     if (req.user.photoId) {
//       await cloudinary.uploader.destroy(req.user.photoId);
//     }

//     const image = parser.format(path.extname(req.file.originalname).toString(), req.file.buffer)
//       .content;

//     const result = await cloudinary.uploader.upload(image, {
//       folder: 'onlien_event',
//     });

//     // Update user photo field & photoId
//     filteredBody.photo = result.secure_url;
//     filteredBody.photoId = result.public_id;
//   }

//   // update user documnet
//   const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
//     new: true,
//     runValidators: true,
//   });

//   return res.status(200).json({
//     status: 'success',
//     data: {
//       user: updatedUser,
//     },
//   });
// });

// exports.deleteMe = catchAsync(async (req, res) => {
//   await User.findOneAndUpdate(req.user.id, { active: false });

//   return res.status(204).json({
//     status: 'success',
//     data: null,
//   });
// });

// exports.getAllUsers = factory.getAll(User);

// exports.getUser = factory.getOne(User);

// // DO NOT update password here
// exports.updateUser = factory.updateOne(User);

// exports.deleteUser = factory.deleteOne(User);