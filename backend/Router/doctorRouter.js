const express = require('express');
const doctorController = require('./../Controllers/doctorController');

const router = express.Router();

// Route for getting all doctors
router.route('/').get(doctorController.getAllDoctors);

// Route for doctor signup
router.route('/signup').post(doctorController.signup);

// Route for doctor login
router.route('/login').post(doctorController.login);

// Route to get details of the logged-in doctor (requires token verification)
router.route('/doctor-details')
    .get(doctorController.verifyToken, doctorController.doctorDetail);

// Route to delete a doctor by ID
router.route('/delete-doctor/:id')
    .delete(doctorController.deleteDoctor);

// Route to update a doctor by ID
router.route('/update-doctor/:id')
    .patch(doctorController.updateDoctor);

// Route to find a doctor by ID
router.route('/find-doctor/:id')
    .get(doctorController.findById);

module.exports = router;
