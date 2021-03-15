class Exception extends Error {
  /**
   * @param {String} message the error message
   * @param {Number} statusCode the error code
   * @returns {Class} An error class
   */
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'failed' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = Exception;
