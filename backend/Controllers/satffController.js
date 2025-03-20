// const mongoose = require('mongoose');
const Staff = require('./../Model/staffModel');
const asyncErrorhandle = require('./../utils/asyncErrorHandler');
const jwt = require('jsonwebtoken');
const Customerror = require('./../utils/CustonError');
const util = require('util');

// Helper function for JWT token generation
const signInTokens = (id) => {
    return jwt.sign({ id }, process.env.SECRET_STR, {
        expiresIn: process.env.EXPIRES_IN
    });
};

// Staff signup
exports.signup = asyncErrorhandle(async (req, res, next) => {
    const newStaff = await Staff.create(req.body);
    console.log(newStaff);

    const token = signInTokens(newStaff._id);

    res.status(200).json({
        token,
        newStaff
    });
});

// Staff login
exports.login = asyncErrorhandle(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        const error = new Customerror("Email and password are required", 400);
        return next(error);
    }

    const staffMember = await Staff.findOne({ email }).select('+password');
console.log(staffMember)
    if (!staffMember || !(await staffMember.compareToInDb(password, staffMember.password))) {
        const error = new Customerror("Invalid email or password", 400);
        return next(error);
    }

    const token = signInTokens(staffMember._id);
    console.log(token);

    res.status(200).json({
        status: 'success',
        token,
        staff: {
            staffMember
        }
    });
});

// Get all staff members
exports.getAllStaff = asyncErrorhandle(async (req, res, next) => {
    const staffMembers = await Staff.find().select("+password");
    console.log(staffMembers);

    res.status(200).json({
        status: 'success',
        totalStaff: staffMembers.length,
        data: {
            staffMembers
        }
    });
});

// Verify token middleware
exports.verifyToken = asyncErrorhandle(async (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader)
    let token;

    if (authHeader && authHeader.startsWith("bearer")) {
        token = authHeader.split(' ')[1];
    }

    if (!token) {
        const error = new Customerror("You are not logged in", 401);
        console.log('no login')
        return next(error);
    }
    console.log(token)

    const decodedToken = await util.promisify(jwt.verify)(token, process.env.SECRET_STR);
    req.userId = decodedToken.id;
    console.log('req.userId:', req.userId);
    next();
});

// Get details of a logged-in staff member
exports.staffDetail = asyncErrorhandle(async (req, res) => {
    try {
        const staffMember = await Staff.findById(req.userId).select('-password');
        if (!staffMember) {
            return res.status(404).json({ message: 'Staff member not found.' });
        }
        console.log('successs')
        res.status(200).json(staffMember);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

// Delete staff member by ID
exports.deleteStaff = asyncErrorhandle(async (req, res, next) => {
    const { id } = req.params;
    console.log(id);

    const staffMember = await Staff.findByIdAndDelete(id);
    console.log(staffMember);

    if (!staffMember) {
        return next(new Customerror(`No staff member found with ID: ${id}`, 404));
    }

    res.status(200).json({
        status: 'success',
        message: 'Staff member deleted successfully',
        data: null
    });
});
exports.assignActivity = asyncErrorhandle(async (req, res, next) => {
    const { staffId, activityId } = req.body;

    // Validate request data
    if (!staffId || !activityId) {
        return next(new Customerror("Staff ID and Activity ID are required", 400));
    }

    // Update the staff member's activity field with the new activity ID
    const updatedStaff = await Staff.findByIdAndUpdate(
        staffId,
        { activities: activityId },
        { new: true, runValidators: true }
    );

    // If staff member is not found, return error
    if (!updatedStaff) {
        return next(new Customerror(`No staff member found with ID: ${staffId}`, 404));
    }

    res.status(200).json({
        status: 'success',
        message: 'Activity assigned successfully',
        data: {
            staff: updatedStaff
        }
    });
});

// Update staff member by ID
exports.updateStaff = asyncErrorhandle(async (req, res, next) => {
    const { id } = req.params;
    const updateData = req.body;

    console.log(updateData);

    const updateFields = {};

    // Handle top-level fields
    if (updateData.firstName) updateFields.firstName = updateData.firstName;
    if (updateData.lastName) updateFields.lastName = updateData.lastName;
    if (updateData.dateOfBirth) updateFields.dateOfBirth = updateData.dateOfBirth;
    if (updateData.gender) updateFields.gender = updateData.gender;
    if (updateData.contactNumber) updateFields.contactNumber = updateData.contactNumber;
    if (updateData.email) updateFields.email = updateData.email;
    if (updateData.position) updateFields.position = updateData.position;
    if (updateData.department) updateFields.department = updateData.department;
    if (updateData.dateOfJoining) updateFields.dateOfJoining = updateData.dateOfJoining;
    if (updateData.employmentType) updateFields.employmentType = updateData.employmentType;
    if (updateData.shiftTiming) updateFields.shiftTiming = updateData.shiftTiming;
    if (updateData.salary) updateFields.salary = updateData.salary;
    if (updateData.nationalID) updateFields.nationalID = updateData.nationalID;
    if (updateData.backgroundCheck !== undefined) updateFields.backgroundCheck = updateData.backgroundCheck;
    if (updateData.medicalClearance !== undefined) updateFields.medicalClearance = updateData.medicalClearance;
    if (updateData.activities) updateFields.activities = updateData.activities;

    // Handle nested fields
    if (updateData.address) {
        if (updateData.address.street) updateFields['address.street'] = updateData.address.street;
        if (updateData.address.city) updateFields['address.city'] = updateData.address.city;
        if (updateData.address.state) updateFields['address.state'] = updateData.address.state;
        if (updateData.address.zipCode) updateFields['address.zipCode'] = updateData.address.zipCode;
    }

    if (updateData.emergencyContact) {
        if (updateData.emergencyContact.name) updateFields['emergencyContact.name'] = updateData.emergencyContact.name;
        if (updateData.emergencyContact.relationship) updateFields['emergencyContact.relationship'] = updateData.emergencyContact.relationship;
        if (updateData.emergencyContact.contactNumber) updateFields['emergencyContact.contactNumber'] = updateData.emergencyContact.contactNumber;
    }

    if (updateData.qualifications) updateFields.qualifications = updateData.qualifications;
    if (updateData.specializations) updateFields.specializations = updateData.specializations;

    if (updateData.assigned_residents) updateFields.assigned_residents = updateData.assigned_residents;

    // Update the staff in the database
    const updatedStaff = await Staff.findByIdAndUpdate(id, { $set: updateFields }, {
        new: true, // Return the updated document
        runValidators: true, // Validate the updated fields based on the schema
    });

    if (!updatedStaff) {
        return next(new Customerror(`No staff member found with ID: ${id}`, 404));
    }

    res.status(200).json({
        status: 'success',
        message: 'Staff member updated successfully',
        data: {
            staff: updatedStaff,
        },
    });
});


// Get staff member by ID
exports.findById = asyncErrorhandle(async (req, res, next) => {
    const { id } = req.params;

    const staffMember = await Staff.findById(id).select('-password'); // Exclude the password field if needed

    if (!staffMember) {
        return next(new Customerror(`No staff member found with ID: ${id}`, 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            staff: staffMember
        }
    });
});
