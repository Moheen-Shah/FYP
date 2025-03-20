    const mongoose = require('mongoose');

    const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Non-binary', 'Other'],
        required: true,
    },
    date_of_birth: {
        type: Date,
        required: true,
    },
    
    contact_details: {
        email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        },
        phone: {
        type: String,
        required: true,
        unique: true,
        },
        address: {
        type: String,
        default: null,
        },
    },
    professional_details: {
        specialization: {
        type: String,
        required: true,
        },
        qualifications: {
        type: String,
        required: true,
        },
        experience: {
        type: Number,
        required: true,
        min: 0,
        },
        availability: {
        type: String,
        default: "Not Specified",
        },
    
    },
    system_details: {
        username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        },
        password: {
        type: String,
        required: true,
        },
        role: {
        type: String,
        default: 'doctor',
        },
    },
    
    
    assigned_residents: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resident',
        },
    ],
    feedback: [
        {
          name: {
            type: String,
            trim: true,
          },
          message: {
            type: String,
          },
        },
      ],
    
    
    
    }, { timestamps: true }); // Adds createdAt and updatedAt fields


    doctorSchema.methods.compareToInDb = async (password, passwordDb) => {
        return await password === passwordDb;
    }
    const Doctor = mongoose.model('Doctor', doctorSchema);
    
    module.exports = Doctor