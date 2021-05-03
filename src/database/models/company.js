const mongoose = require('mongoose');

const requiredField = {
  type: String,
  required: true,
};

const companySchema = mongoose.Schema({
  name: requiredField,
  slogan: String,
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Company must have an owner'],
  },
  ambassador: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  executes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
  goalUploadInterval: String,
});

module.exports = mongoose.model('Company', companySchema);
