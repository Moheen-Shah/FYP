const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    enum: ['Exercise', 'Art & Craft', 'Music', 'Social Gathering', 'Educational', 'Therapeutic'],
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
  },
  time: {
    type: String,
    required: true,
  },
  staffId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Staff', // Reference to the Staff model
    default: null, // Initially null, to be assigned later
  },
}, { timestamps: true });

const Activity = mongoose.model('Activity', activitySchema);
module.exports = Activity;
