const mongoose = require('mongoose');
const AddedResisdent = require('./../Model/addedResisdentModel');
const asyncErrorhandle = require('./../utils/asyncErrorHandler');
const jwt = require('jsonwebtoken');
const Customerror = require('./../utils/CustonError');
const asyncErrorHandler = require('./../utils/asyncErrorHandler');
const util = require('util');

// Token generation for AddedResident
const signInTokens = (id) => {
    return jwt.sign({ id }, process.env.SECRET_STR, {
        expiresIn: process.env.EXPIRES_IN
    });
};

// Add a new resident
exports.addResident = asyncErrorhandle(async (req, res, next) => {
    // const { password, conformPassword } = req.body;

    // Check if passwords match
    // if (password !== conformPassword) {
    //     return next(new Customerror("Passwords do not match", 400));
    // }

    // Create the new resident using req.body
    const newResident = await AddedResisdent.create(req.body);
console.log(newResident)
    // Generate a token for the new resident
    const token = signInTokens(newResident._id);

    res.status(200).json({
        status: 'success',
        token,
        resident: newResident
    });
});



// // Signup - Create a new added resident
// exports.signup = asyncErrorhandle(async (req, res, next) => {
//     const newUser = await AddedResisdent.create(req.body);
//     const token = signInTokens(newUser._id);

//     res.status(201).json({
//         token,
//         newUser
//     });
// });

// Login for added resident
exports.login = asyncErrorhandle(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        const error = new Customerror("Email and password are required", 400);
        return next(error);
    }

    const user = await AddedResisdent.findOne({ email }).select('+password');
    // console.log(user)
    if (!user || !(await user.compareToInDb(password, user.password))) {
        const error = new Customerror("Invalid email or password", 400);
        return next(error);
    }

    const token = signInTokens(user._id);

    res.status(200).json({
        status: 'success',
        token,
        resident: {
            user
        }
    });
});

// Get all added residents
exports.getAllAddedResidents = asyncErrorhandle(async (req, res, next) => {
    const addedResidents = await AddedResisdent.find();

    res.status(200).json({
        status: 'success',
        totalResidents: addedResidents.length,
        data: {
            addedResidents
        }
    });
});

// Verify Token Middleware
exports.verifyToken = asyncErrorhandle(async (req, res, next) => {
    const tokenFromHeader = req.headers.authorization;
    let token;

    if (tokenFromHeader && tokenFromHeader.startsWith("bearer")) {
        token = tokenFromHeader.split(' ')[1];
        console.log(token)
    }

    if (!token) {
        console.log(token)
        const error = new Customerror("You are not logged in", 401);
        return next(error);
    }

    const decodedToken = await util.promisify(jwt.verify)(token, process.env.SECRET_STR);
    req.userId = decodedToken.id;

    next();
});

// Get details of the logged-in added resident
exports.getAddedResidentDetail = asyncErrorHandler(async (req, res) => {
    try {
        const addedResident = await AddedResisdent.findById(req.userId).select('-password');
        if (!addedResident) {
            return res.status(404).json({ message: 'Added resident not found.' });
        }
        res.status(200).json(addedResident);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});




// Delete added resident by ID
exports.deleteAddedResident = asyncErrorHandler(async (req, res, next) => {
    try {
        const { id } = req.params;
console.log(id)
        const deletedResident = await AddedResisdent.findByIdAndDelete(id);

        if (!deletedResident) {
            return res.status(404).json({
                status: 'fail',
                message: 'Added resident not found.'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Added resident successfully deleted.',
            data: null
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
            error: error.message
        });
    }
});


exports.updateResident = asyncErrorhandle(async (req, res, next) => {
    const { id } = req.params;
    const updateData = req.body; // Data to be updated, passed in the request body

    // Prepare update fields for nested structures
    const updateFields = {};

    if (updateData.first_name) updateFields.first_name = updateData.first_name;
    if (updateData.last_name) updateFields.last_name = updateData.last_name;
    if (updateData.date_of_birth) updateFields.date_of_birth = updateData.date_of_birth;
    if (updateData.gender) updateFields.gender = updateData.gender;
    if (updateData.email) updateFields.email = updateData.email;
    if (updateData.phone) updateFields.phone = updateData.phone;
    if (updateData.assigned_staff) updateFields.assigned_staff = updateData.assigned_staff;
    if (updateData.assigned_doctor) updateFields.assigned_doctor = updateData.assigned_doctor;
    if (updateData.assigned_activity) updateFields.assigned_activity = updateData.assigned_activity;
    if (updateData.healthConditions) updateFields.healthConditions = updateData.healthConditions;
    if (updateData.allergies) updateFields.allergies = updateData.allergies;
    if (updateData.bloodType) updateFields.bloodType = updateData.bloodType;
    if (updateData.mobilityStatus) updateFields.mobilityStatus = updateData.mobilityStatus;
    if (updateData.dietaryPreferences) updateFields.dietaryPreferences = updateData.dietaryPreferences;
    if (updateData.feedback) updateFields.feedback = updateData.feedback;

    if (updateData.carePlan) {
        if (updateData.carePlan.specialInstructions)
            updateFields['carePlan.specialInstructions'] = updateData.carePlan.specialInstructions;
    }

    if (updateData.familyContacts) {
        updateFields.familyContacts = updateData.familyContacts;
    }

    if (updateData.lastCheckIn) updateFields.lastCheckIn = updateData.lastCheckIn;

    // Update the resident in the database
    const updatedResident = await AddedResisdent.findByIdAndUpdate(
        id,
        { $set: updateFields },
        {
            new: true, // Return the updated document
            runValidators: true, // Validate the updated fields based on the schema
        }
    );

    if (!updatedResident) {
        return next(new Customerror(`No resident found with ID: ${id}`, 404));
    }

    res.status(200).json({
        status: 'success',
        message: 'Resident updated successfully',
        data: {
            resident: updatedResident,
        },
    });
});


exports.findAddedResident = asyncErrorhandle(async (req, res, next) => {
    const { id } = req.params;

    // Fetch the resident by ID
    const resident = await AddedResisdent.findById(id);

    if (!resident) {
        return next(new Customerror(`No resident found with ID: ${id}`, 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            resident
        }
    });
});
