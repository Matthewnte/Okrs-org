const mongoose = require('mongoose');
const config = require('../config');
// const logger = require('../config/winston');

/**
 * @name connectDB
 * @return {Null} Null
 */
const connectDB = async () => {
  const uri = config.database.url.replace('<password>', config.database.password);
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log('DB connection successful');
  } catch (error) {
    console.log('An error occured connecting to DB');
  }
};

module.exports = connectDB;
