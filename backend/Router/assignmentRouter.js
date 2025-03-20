const express = require('express');
const router = express.Router();
const assignmentController = require('./../Controllers/assignmentController');

// Route to create a new assignment
router.post('/create', assignmentController.createAssignment);

// Route to get all assignments
router.get('/', assignmentController.getAllAssignments);

// Route to get assignments by resident ID
router.get('/resident/:residentId', assignmentController.getAssignmentsByResident);

// Route to get assignments by activity ID
router.get('/activity/:activityId', assignmentController.getAssignmentsByActivity);

// Route to update assignment status by assignment ID
router.put('/update-status/:assignmentId', assignmentController.updateAssignmentStatus);

// Route to delete an assignment by assignment ID
router.delete('/delete/:assignmentId', assignmentController.deleteAssignment);

module.exports = router;
