const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const AddedResisdentSchema = mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    date_of_birth: { type: Date, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    photo: { type: String },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: {
        type: String,
        required: [true, "please enter password"],
        minlength: 8,
        select: false
    },
    assigned_doctor: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Doctors',
        },],
     assigned_activity: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Activities',
            },],
    // conformPassword: {
    //     type: String,
    //     required: [true, 'please confirm your password'],
    //     validate: {
    //         validator: function (val) {
    //             return val === this.password;
    //         },
    //         message: "password and confirm password do not match"
    //     }
    // },
    passwordChangedAt: Date,
    resetpasswordToken: String,
    resetpasswordTokenExpires: Date,
      // Health and Medical Information
      healthConditions: [String], // e.g., ['Diabetes', 'Hypertension']
      allergies: [String], // e.g., ['Peanuts', 'Penicillin']
     
      bloodType: { type: String },
      mobilityStatus: { type: String },
      dietaryPreferences: [String], // e.g., ['Vegetarian', 'Gluten-free']
  
      // Residency Information
      feedback: [
        {
            name: {
                type: String,
              },
         
          message: {
            type: String,
          },
        },
      ],
      
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

      assigned_staff: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Staff',
        },
    ],
  
      // Status Tracking
      lastCheckIn: Date, // Last staff check-in timestamp
      // For tracking staff notes on the resident
  
  },
 

  
  {
      timestamps: true // Adds createdAt and updatedAt timestamps automatically
  }




);

// Hash password before saving
// AddedResisdentSchema.pre('save', async function (next) {
//     // if (!this.isModified('password')) return next();

//     this.password = await bcrypt.hash(this.password, 12);

//     // this.conformPassword = undefined; // We don't want to persist this in the database
//     next();
// });

// Method to compare password
AddedResisdentSchema.methods.compareToInDb= async (password,passwordDb)=>{
    return await bcrypt.compare(password, passwordDb);
 }


// Check if password was changed after token issuance
// AddedResisdentSchema.methods.isPasswordChanged = async function (JWTtimeStamp) {
//     if (this.passwordChangedAt) {
//         const changedPasswordTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
//         return JWTtimeStamp < changedPasswordTimeStamp;
//     }
//     return false;
// };

// Generate password reset token
// AddedResisdentSchema.methods.createResetPasswordToken = function () {
//     const resetToken = crypto.randomBytes(32).toString('hex');

//     this.resetpasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
//     this.resetpasswordTokenExpires = Date.now() + 10 * 60 * 1000; // Token valid for 10 minutes

//     console.log(resetToken, this.resetpasswordToken);
//     return resetToken;
// };

const AddedResisdent = mongoose.model('AddedResisdent', AddedResisdentSchema);

module.exports = AddedResisdent;
