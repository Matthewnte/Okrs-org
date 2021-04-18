/* eslint-disable require-jsdoc */
const Exception = require('../../helpers/exception');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new Exception(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const keyVal = Object.keys(err.keyValue)[0];
  const message = `${keyVal} already exists. Please, use a different ${keyVal}`;
  return new Exception(message, 400);
};

const handleValidationErrorDB = (err) => {
  const message = Object.values(err.errors).map((value) => value.message);
  return new Exception(message, 400);
};

const sendErrorDev = (err, res) =>
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
  });

const sendErrorProd = (err, res) => {
  // Operational, trusted error
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  // Programming or other unknown error
  return res.status(500).json({
    status: 'error',
    message: 'Oops! Something went wrong',
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') return sendErrorDev(err, res);
  if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;

    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
    sendErrorProd(error, res);
  }
};
