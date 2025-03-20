const Admin = require('./../Model/adminModel'); // assuming your schema file is stored in models/admin.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Customerror = require('./../utils/CustonError');
const asyncErrorHandler = require('./../utils/asyncErrorHandler');




const signInTokens =(id) =>{
    return jwt.sign({id},process.env.SECRET_STR,{
         expiresIn: process.env.EXPIRES_IN
        })
      
 }

// Admin login controller
exports.adminLogin =asyncErrorHandler( async (req, res) => {
    const { name, password } = req.body;

    try {


        if (!name || !password) {
            const error = new Customerror("Name and password are required", 400);
            return next(error);
        }
        // Check if the admin exists
        const admin = await Admin.findOne({ name });
        if (!admin) {
            const error = new Customerror("admin not found",400)
            return next(error)
        }

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            const error = new Customerror("Invalid password",400)
            return next(error)
        }

        // Create a JWT token (you can configure your secret key in an environment variable)
        const token = signInTokens(admin._id)


        // Send back the token and success message
        return res.status(200).json({
            status:'success',
            message: 'Login successful',
            data:{
                token:token,
                name:name
            } 
        });

    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});



exports.adminSignup = asyncErrorHandler(async (req, res, next) => {
    const { name, password } = req.body;

    // Check if both name and password are provided
    if (!name || !password) {
        const error = new Customerror("Name and password are required", 400);
        return next(error);
    }

    // Check if the admin with the same name already exists
    const existingAdmin = await Admin.findOne({ name });
    if (existingAdmin) {
        const error = new Customerror("Admin with this name already exists", 400);
        return next(error);
    }
    

    // // Hash the password before saving to the database
    // const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds for bcrypt

    // Create a new admin
    const newAdmin = await Admin.create({
        name,
        password
    });


    const token = signInTokens(newAdmin._id)

    // Respond with success message
    res.status(200).json({
        status: 'success',
        message: 'Admin registered successfully',
        token,
        admin: {
            id: newAdmin._id,
            name: newAdmin.name
        }
    });
});