const mongoose = require('mongoose');
const Resisdent = require('./../Model/resisdentModel')
const asyncErrorhandle = require('./../utils/asyncErrorHandler');
const jwt = require('jsonwebtoken');
const Customerror = require('./../utils/CustonError');
const asyncErrorHandler = require('./../utils/asyncErrorHandler');
const util = require('util')


const signInTokens =(id) =>{
    return jwt.sign({id},process.env.SECRET_STR,{
         expiresIn: process.env.EXPIRES_IN
        })
      
 }


 exports.signup = asyncErrorhandle( async(req,res,next)=>{
    const newUser =await Resisdent.create(req.body);
    
 console.log(newUser)

  const token = signInTokens(newUser._id);



    res.status(200).json({token,
        newUser
    })
})



// exports.login = asyncErrorhandle (   async (req,res,next)=>{


//     const {email,password} = req.body;
    
//     if(!email || !password) {
//         const error = new Customerror("email and password is not valid ",400);
//         return next(error);l 
    
//     }
//     const User = await Resisdent.findOne({email}).select('+password');
    
    
//     if(!User || !(await User.compateToInDb(password,User.password))){
//         const error = new Customerror("invalid email or password",400);
//          return next(error)
//     }
//       const token = signInTokens(User._id);
//       console.log(token)
//     res.status(200).json({
//         status:'success',
//         token,
//         Resisdent:{
//             User
//         }
        
//     })
    
    
//         });


exports.getAllresisdents = asyncErrorhandle(async(req,res,next)=>{

    const resisdents =await  Resisdent.find().select("+password");

    console.log(resisdents)

    res.status(200).json({
        status:'success',
        TotalResisdent:resisdents.length,
        data:{
            resisdents
        }
    })
})


exports.verifyToken =asyncErrorhandle( async (req, res, next) => {
     // read token and check it exists
const testToken = req.headers.authorization;
console.log(testToken)
let token1;
if(testToken && testToken.startsWith("beares")){
    token1 =  testToken.split(' ')[1];
} 
console.log(token1)

// validate the token

if(!token1){
    const error = new Customerror("you are not logged in", 401);
    next(error);

}

  const decodedToken = await  util.promisify(jwt.verify)(token1,process.env.SECRET_STR);
req.userId = decodedToken.id;
console.log('req.userid' + req.userId)
next();

  });

  exports.resisdentdetail =asyncErrorHandler(async (req, res) => {
    try {
      const resident = await Resisdent.findById(req.userId).select('-password');
      if (!resident) {
        return res.status(404).json({ message: 'Resident not found.' });
      }
      res.status(200).json(resident);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  });
  

  exports.deleteResisdent = asyncErrorhandle(async (req, res, next) => {
    const { id } = req.params; // Get the resident ID from request params
console.log(id)
    const resident = await Resisdent.findByIdAndDelete(id); // Find and delete the resident by ID
console.log(resident)
    if (!resident) {
        return next(new Customerror(`No resident found with ID: ${id}`, 404)); // Handle case where resident is not found
    }

    res.status(200).json({
        status: 'success',
        message: 'Resident deleted successfully',
        data: null // No data is returned after deletion
    });
});
