const Assignment = require('./../Model/assignmentModel');

// 1. Create a new assignment
exports.createAssignment = async (req, res) => {
  try {
    const { activityId, residentId, assignedBy, notes } = req.body;
    const newAssignment = new Assignment({
      activityId,
      residentId,
      assignedBy,
      notes
    });
    const savedAssignment = await newAssignment.save();
    res.status(201).json({ message: 'Assignment created successfully', data: savedAssignment });
  } catch (error) {
    res.status(400).json({ message: 'Error creating assignment', error: error.message });
  }
};

// 2. Get all assignments
exports.getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find().populate('activityId residentId assignedBy');
    res.status(200).json({ data: assignments });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching assignments', error: error.message });
  }
};

// 3. Get assignments by resident
exports.getAssignmentsByResident = async (req, res) => {
  try {
    const { residentId } = req.params;
    const assignments = await Assignment.find({ residentId }).populate('activityId assignedBy');
    res.status(200).json({ data: assignments });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching resident assignments', error: error.message });
  }
};

// 4. Get assignments by activity
exports.getAssignmentsByActivity = async (req, res) => {
  try {
    const { activityId } = req.params;
    const assignments = await Assignment.find({ activityId }).populate('residentId assignedBy');
    res.status(200).json({ data: assignments });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching activity assignments', error: error.message });
  }
};

// 5. Update assignment status
exports.updateAssignmentStatus = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const { status, notes } = req.body;
    const updatedAssignment = await Assignment.findByIdAndUpdate(
      assignmentId,
      { status, notes },
      { new: true }
    );
    res.status(200).json({ message: 'Assignment status updated', data: updatedAssignment });
  } catch (error) {
    res.status(400).json({ message: 'Error updating assignment status', error: error.message });
  }
};

// 6. Delete an assignment
exports.deleteAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    await Assignment.findByIdAndDelete(assignmentId);
    res.status(200).json({ message: 'Assignment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting assignment', error: error.message });
  }
};
