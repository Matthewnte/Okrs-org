const mongoose = require('mongoose');

const requiredField = {
  type: String,
  required: true,
};

const groupSchema = mongoose.Schema({
  name: requiredField,
  mission: String,
  lead: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Group must have a lead'],
  },
  members: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: 'A group must have at least one member',
    },
  ],
  subgroup: [String],
  slackChannel: [String],
});

module.exports = mongoose.model('Group', groupSchema);
