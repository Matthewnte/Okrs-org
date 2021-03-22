const multer = require('multer');
const Exception = require('../../helpers/exception');

const storage = multer.memoryStorage();

// Set fileSize limit - 3MB
const limits = {
  fileSize: 3000000,
};

/**
 * @name searchVehicle
 * @param {Object} request Express Request Object
 * @param {Object} file File to be uploaded
 * @param {Function} cb Callback
 * @returns {Object} the callback result
 */
const fileFilter = (request, file, cb) => {
  // accept images only
  if (!file.mimetype.startsWith('image')) {
    return cb(new Exception('File uploaded was not an image, Please upload only images', 400));
  }
  // else accept the file
  return cb(null, true);
};

// Init upload middleware
const upload = multer({ storage, limits, fileFilter });

exports.uploadSingle = upload.single('file');
exports.uploadMultiple = upload.array('files');
