const mongoose = require('mongoose');
const { Schema } = mongoose;

const assignmentSchema = new Schema({
  activityId: {
    type: Schema.Types.ObjectId,
    ref: 'Activity',  // Reference to the Activity model
    required: true
  },
  residentId: {
    type: Schema.Types.ObjectId,
    ref: 'Resident',  // Reference to the Resident model
    required: true
  },
  assignedBy: {
    type: Schema.Types.ObjectId,
    ref: 'Staff',  // Reference to the Staff model (the one who assigned the activity)
    required: true
  },
  assignedDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending'
  },
  notes: {
    type: String,
    default: '',
    trim: true
  }
}, {
  timestamps: true  // Adds createdAt and updatedAt timestamps
});

// Add a unique constraint on activity-resident pairs to prevent duplicate assignments
assignmentSchema.index({ activityId: 1, residentId: 1 }, { unique: true });

module.exports = mongoose.model('Assignment', assignmentSchema);
