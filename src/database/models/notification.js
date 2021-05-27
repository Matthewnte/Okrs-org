const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    initiatorUserId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: 'A Notification must have an initiator',
    },
    recepientUserId: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: 'A Notification must have a recepient',
      },
    ],
    message: { type: Object },
    status: {
      type: String,
      enum: ['SENT', 'READ', 'UNREAD'],
      default: 'UNREAD',
    },
    entity: mongoose.Schema.ObjectId,
  },
  {
    timestamps: true,
  },
);

notificationSchema.pre(/^find/, function (next) {
  this.populate({ path: 'initiatorUserId', select: '-groups -__v' }).populate({
    path: 'recepientUserId',
    select: '-groups -__v',
  });
  next();
});

module.exports = mongoose.model('Notification', notificationSchema);
