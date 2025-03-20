const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
    // Basic Information
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "please enter password"],
        minlength: 8,
        select: false
    },
    address: {
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        zipCode: {
            type: String,
            required: true
        }
    },
    // Employment Details
    position: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    dateOfJoining: {
        type: Date,
        required: true
    },
    employmentType: {
        type: String,
        enum: ['Full-time', 'Part-time', 'Contract'],
        required: true
    },
    shiftTiming: {
        type: String,
        enum: ['Morning', 'Evening', 'Night'],
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    // Qualification and Experience
    qualifications: {
        type: [String],
        required: true
    },
    yearsOfExperience: {
        type: Number,
        required: true
    },
    specializations: {
        type: [String]
    },
    // Identification and Verification
    nationalID: {
        type: String,
        required: true,
        unique: true
    },
    backgroundCheck: {
        type: Boolean,
        default: false
    },
    medicalClearance: {
        type: Boolean,
        default: false
    },
    emergencyContact: {
        name: {
            type: String,
            required: true
        },
        relationship: {
            type: String,
            required: true
        },
        contactNumber: {
            type: String,
            required: true
        }
    },
    assigned_residents: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AddedResisdent',
        },
    ],
   
    // New Activities Field
    activities: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Activity',
        default: null
    }
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps automatically
});

staffSchema.methods.compareToInDb = async (password, passwordDb) => {
    return await password === passwordDb;
}

const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;
