const mongoose = require('mongoose');
const config = require('../config');
const logger = require('../config/winston');

/**
 * @name connectDB
 * @return {Null} Null
 */
const connectDB = async () => {
  try {
    await mongoose.connect(config.database.url, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    logger.info('DB connection successful');
  } catch (error) {
    logger.error('An error occured connecting to DB');
  }
};

module.exports = connectDB;
