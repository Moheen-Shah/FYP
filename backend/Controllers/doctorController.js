const Doctor = require('./../Model/doctorModel');
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

// Doctor signup
exports.signup = asyncErrorhandle(async (req, res, next) => {
    const newDoctor = await Doctor.create(req.body);
    console.log(newDoctor);

    const token = signInTokens(newDoctor._id);

    res.status(200).json({
        token,
        newDoctor
    });
});

// Doctor login
exports.login = asyncErrorhandle(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        const error = new Customerror("Email and password are required", 400);
        return next(error);
    }

    // Querying by nested field 'contact_details.email'
    const doctor = await Doctor.findOne({ "contact_details.email": email }).select('+system_details.password');
    console.log(doctor);

    if (!doctor || !(await password === doctor.system_details.password)) {
        const error = new Customerror("Invalid email or password", 400);
        return next(error);
    }

    const token = signInTokens(doctor._id);
    console.log(token);

    res.status(200).json({
        status: 'success',
        token,
        doctor: {
            doctor
        }
    });
});


// Get all doctors
exports.getAllDoctors = asyncErrorhandle(async (req, res, next) => {
    const doctors = await Doctor.find().select("-system_details.password");
    console.log(doctors);

    res.status(200).json({
        status: 'success',
        totalDoctors: doctors.length,
        data: {
            doctors
        }
    });
});

// Verify token middleware
exports.verifyToken = asyncErrorhandle(async (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    let token;

    if (authHeader && authHeader.startsWith("bearer")) {
        token = authHeader.split(' ')[1];
    }

    if (!token) {
        const error = new Customerror("You are not logged in", 401);
        console.log('no login');
        return next(error);
    }
    console.log(token);

    const decodedToken = await util.promisify(jwt.verify)(token, process.env.SECRET_STR);
    req.userId = decodedToken.id;
    console.log('req.userId:', req.userId);
    next();
});

// Get details of a logged-in doctor
exports.doctorDetail = asyncErrorhandle(async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.userId).select('-system_details.password');
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found.' });
        }
        console.log('success from database');
        console.log(doctor)
        res.status(200).json({
            status:"success",
            data:doctor
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

// Delete doctor by ID
exports.deleteDoctor = asyncErrorhandle(async (req, res, next) => {
    const { id } = req.params;
    console.log(id);

    const doctor = await Doctor.findByIdAndDelete(id);
    console.log(doctor);

    if (!doctor) {
        return next(new Customerror(`No doctor found with ID: ${id}`, 404));
    }

    res.status(200).json({
        status: 'success',
        message: 'Doctor deleted successfully',
        data: null
    });
});

// Update doctor by ID
exports.updateDoctor = asyncErrorhandle(async (req, res, next) => {
    const { id } = req.params;
    const updateData = req.body; // Data to be updated, passed in the request body
console.log(updateData)
    // Ensure nested fields are handled correctly
    const updateFields = {};

    if (updateData.name) updateFields.name = updateData.name;
    if (updateData.gender) updateFields.gender = updateData.gender;
    if (updateData.date_of_birth) updateFields.date_of_birth = updateData.date_of_birth;

    if (updateData.contact_details) {
        updateFields['contact_details.email'] = updateData.contact_details.email;
        updateFields['contact_details.phone'] = updateData.contact_details.phone;
        updateFields['contact_details.address'] = updateData.contact_details.address;
    }

    if (updateData.professional_details) {
        updateFields['professional_details.specialization'] = updateData.professional_details.specialization;
        updateFields['professional_details.qualifications'] = updateData.professional_details.qualifications;
        updateFields['professional_details.experience'] = updateData.professional_details.experience;
        updateFields['professional_details.availability'] = updateData.professional_details.availability;
    }

    if (updateData.system_details) {
        updateFields['system_details.username'] = updateData.system_details.username;
        updateFields['system_details.password'] = updateData.system_details.password;
        updateFields['system_details.role'] = updateData.system_details.role;
    }

    if (updateData.assigned_residents) {
        updateFields.assigned_residents = updateData.assigned_residents;
    }

    // Handle appending to feedback field
    if (updateData.feedback) {
        const feedback = Array.isArray(updateData.feedback)
            ? updateData.feedback // If the feedback is an array, use it directly
            : [updateData.feedback]; // Wrap single feedback object in an array

       

        // Append feedback to existing array
        updateFields.feedback = [...feedback];
        
    }

    // Update the doctor in the database
    const updatedDoctor = await Doctor.findByIdAndUpdate(id, { $set: updateFields }, {
        new: true, // Return the updated document
        runValidators: true, // Validate the updated fields based on the schema
    });

    if (!updatedDoctor) {
        return next(new Customerror(`No doctor found with ID: ${id}`, 404));
    }

    res.status(200).json({
        status: 'success',
        message: 'Doctor updated successfully',
        data: {
            doctor: updatedDoctor,
        },
    });
});



// Get doctor by ID
exports.findById = asyncErrorhandle(async (req, res, next) => {
    const { id } = req.params;

    const doctor = await Doctor.findById(id).select('-system_details.password');

    if (!doctor) {
        return next(new Customerror(`No doctor found with ID: ${id}`, 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            doctor
        }
    });
});
