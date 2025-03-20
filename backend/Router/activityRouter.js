const express = require('express');
const activityController = require('./../Controllers/activityController');

const router = express.Router();

// Route to get all activities
router.route('/').get(activityController.getAllActivities);

// Route for creating a new activity
router.route('/add-activity').post(activityController.addActivity);

// Route to delete an activity by ID
router.route('/delete-activity/:id').delete(activityController.deleteActivity);

// Route to assign an activity to staff
router.route('/assign-activity').post(activityController.assignActivityToStaff);

// Route to update an activity by ID
router.route('/update-activity/:id').patch(activityController.updateActivity);

module.exports = router;
