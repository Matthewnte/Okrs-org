const mongoose = require('mongoose');

const requiredField = {
  type: String,
  required: true,
};

const timeFrameSchema = mongoose.Schema({
  name: requiredField,
  timeFrame: requiredField,
  startDate: { min: Date.now, type: Date },
});

module.exports = mongoose.model('TimeFrame', timeFrameSchema);
