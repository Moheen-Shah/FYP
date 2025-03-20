const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const ResidentSchema = new mongoose.Schema({
    // Basic Information
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    date_of_birth: { type: Date, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
   
    email: { 
        type: String, 
        required: true, 
        validate: [validator.isEmail, 'Please enter a valid email'] 
    },
    phone: { type: String, required: true },

    // Emergency Contacts
    emergencyContact: {
        name: { type: String, required: true },
        relationship: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String, validate: [validator.isEmail, 'Please enter a valid email'] },
    },

    // Authentication & Security
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: 8,
        select: false
    },
    confirmPassword: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            validator: function(val) {
                return val === this.password;
            },
            message: "Passwords do not match"
        }
    },
    passwordChangedAt: Date,
    resetPasswordToken: String,
    resetPasswordTokenExpires: Date,

    // Health and Medical Information
    healthConditions: [String], // e.g., ['Diabetes', 'Hypertension']
    allergies: [String], // e.g., ['Peanuts', 'Penicillin']
   
    bloodType: { type: String },
    mobilityStatus: { type: String },
    dietaryPreferences: [String], // e.g., ['Vegetarian', 'Gluten-free']

    // Residency Information
   
    
    carePlan: {
        // e.g., ['Physical Therapy', 'Social Hour']
        specialInstructions: { type: String }
    },

    // Family Contacts
    familyContacts: [{
        name: { type: String },
        relationship: { type: String },
        phone: { type: String },
        email: { type: String, validate: [validator.isEmail, 'Please enter a valid email'] },
    }],

    // Status Tracking
    lastCheckIn: Date, // Last staff check-in timestamp
    // For tracking staff notes on the resident

}, {
    timestamps: true // Adds createdAt and updatedAt timestamps automatically
});

// Hash password before saving
ResidentSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined;
    next();
});

// Method to compare passwords
ResidentSchema.methods.compareToInDb = async function(password, passwordDb) {
    return await bcrypt.compare(password, passwordDb);
};

// Check if password changed after token issuance
ResidentSchema.methods.isPasswordChanged = function(JWTtimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        return JWTtimestamp < changedTimestamp;
    }
    return false;
};

// Create a reset password token
ResidentSchema.methods.createResetPasswordToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.resetPasswordTokenExpires = Date.now() + 10 * 60 * 1000; // Token expires in 10 minutes
    return resetToken;
};

const Resident = mongoose.model('Resisdent', ResidentSchema);

module.exports = Resident;
