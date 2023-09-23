const ErrorHandler = require('../utils/errorHandler.js')
const catchAsyncError = require('./catchAsyncError.js')
const jwt=require('jsonwebtoken')
const User=require('../Models/userModel.js')
const isAuthenticateUser=catchAsyncError(async(req,res,next)=>{
    const {token}=req.cookies
   
    if(!token){
        return next(new ErrorHandler("Please Login to access this resourse",401))
    }
    const decodedData=jwt.verify(token,process.env.JWT_SECRET)
    req.user=await User.findById(decodedData.id)
    next()
})


const authorizeRoles=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
           return next( new ErrorHandler(`Role ${req.user.role} is not allowed to access this resource`,403))
        }
        next();
    }
}

module.exports={isAuthenticateUser,authorizeRoles}