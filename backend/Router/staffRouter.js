const express = require('express');
const staffController = require('./../Controllers/satffController');

const router = express.Router();

// Route for getting all staff members
router.route('/').get(staffController.getAllStaff);

// Route for staff signup
router.route('/signup').post(staffController.signup);

// Route for staff login
router.route('/login').post(staffController.login);

// Route to get details of the logged-in staff member (requires token verification)
router.route('/staff-details')
    .get(staffController.verifyToken, staffController.staffDetail);

// Route to delete a staff member by ID
router.route('/delete-staff/:id')
    .delete(staffController.deleteStaff);

// Route to assign an activity to a staff member
router.route('/assign-activity')
    .post(staffController.assignActivity);

// Route to update a staff member by ID
router.route('/update-staff/:id')
    .patch(staffController.updateStaff);

// Route to find a staff member by ID
router.route('/find-staff/:id')
    .get(staffController.findById);

module.exports = router;
