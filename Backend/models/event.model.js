const mongoose = require('mongoose');

const eventSchema = mongoose.Schema(
  {
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: [true, 'Please add the event title'],
    },
    description: {
      type: String,
      required: [true, 'Please add the event description'],
    },
    date: {
      type: Date,
      required: [true, 'Please add the event date'],
    },
    time: {
      type: String,
      required: [true, 'Please add the event time'],
    },
    location: {
      type: String,
      required: [true, 'Please add the event location'],
    },
    rsvps: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Event', eventSchema);
