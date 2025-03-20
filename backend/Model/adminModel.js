const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
// Define the schema for the admin
const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
});


adminSchema.pre('save',async function(next){
    
  
     this.password= await bcrypt.hash(this.password, 10)
  
    
     next();
  
  })

// Create the model from the schema
const Admin = mongoose.model('Admin', adminSchema);

// Export the model
module.exports = Admin;



