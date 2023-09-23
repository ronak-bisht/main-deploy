const catchAsyncError=require('../middleware/catchAsyncError.js')
const ErrorHandler = require('../utils/errorHandler.js');
const User=require('../Models/userModel.js')
const sendToken=require('../utils/jwtToken.js')
const sendEmail=require('../utils/sendEmail.js')
const crypto=require('crypto')
const cloudinary=require('cloudinary')
//Registration a User

const register=catchAsyncError(async(req,res,next)=>{
    
    const {name,email,password}=req.body
    const user=await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:"temp",
            url:"temp"
        }
    })
    sendToken(user,201,res)
})


// Login a User

const login=catchAsyncError(async (req,res,next)=>{
    const {email,password}=req.body
    
    if(!email || !password){
        return next(new ErrorHandler('Please Enter Email or Password'),400)
    }
    const user=await User.findOne({email}).select('+password')
    if(!user){
        return next(new ErrorHandler("Invalid Email or Password"),401)
    }
   
    const isPasswordMatched = await user.comparePassword(password)
    console.log(isPasswordMatched)
    if(!isPasswordMatched){
        return next(new ErrorHandler('Invalid Email or Password'),401)
    }
    
    sendToken(user,200,res)
})


const logout=catchAsyncError(async (req,res,next)=>{
    res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).json({
        success:true,
        message:"Logged out"
    })
})


//Forgot password

const forgotPassword=catchAsyncError(async(req,res,next)=>{
    const user=await User.findOne({email:req.body.email})
    if(!user){
        return next(new ErrorHandler("User not found",404))

    }
    const resetToken=user.getResetPasswordToken()
    await user.save({validateBeforeSave:false})
    // const resetPasswordUrl=`${req.protocol}://${req.get('host')}/password/reset/${resetToken}`
    const resetPasswordUrl=`http://127.0.0.1:5173//password/reset/${resetToken}`
    const message=`Your password reset token is :- \n\n ${resetPasswordUrl}`

    try{
        await sendEmail({
            email:user.email,
            subject:`Ecommerce Password Recovery`,
            message
        })

        res.status(200).json({
            success:true,
            message:`Email sent to ${user.email} successfully`
        })
    }catch(err){
        user.resetPasswordToken=undefined
        user.resetPasswordExpire=undefined

        await user.save({validateBeforeSave:false})
        return next(new ErrorHandler(err.message,500))
    }
})


//reset password

const resetPassword=catchAsyncError(async(req,res,next)=>{
    const resetPasswordToken=crypto.createHash('sha256').update(req.params.token).digest('hex')
    const user=await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()}
    })
    if(!user){
        return next(new ErrorHandler("reset password token is invalid or has been expired", 400))

    }
    if(req.body.password!==req.body.confirmPassword){
        return next(new ErrorHandler("Password does not match",400))
    }
    user.password=req.body.password
    user.resetPasswordExpire=undefined
    user.resetPasswordToken=undefined

    await user.save()
    sendToken(user,200,res)
})

const getUserDetails=catchAsyncError(async(req,res,next)=>{
    const user=await User.findById(req.user.id)
    res.status(200).json({
        success:true,
        user
    })
})

const updateProfile=catchAsyncError(async(req,res,next)=>{
    const newUserData={
        name:req.body.name,
        email:req.body.email
    }
    
    const user=await User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).json({
        success:true,
        user
    })
})


// get all users - ADMIN
const getAllUsers=catchAsyncError(async(req,res,next)=>{
    const users=await User.find()
    res.status(200).json({
        success:true,
        users
    })
})

// GET SINGLE USER - ADMIN
const getUser=catchAsyncError(async(req,res,next)=>{
    const user=await User.findById(req.params.id)
    if(!user){
        return next(new ErrorHandler(`user does not exist with id: ${req.params.id}`,400))
    }
    res.status(200).json({
        success:true,
        user
    })
})

//DELETE USER - ADMIN
 const deleteUser=catchAsyncError(async(req,res,next)=>{
    
    const user=await User.findById(req.params.id)
    
    if(!user){
        return new ErrorHandler('User does not exist ')
    }
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json({
        success:true,
        message:'user deleted'
    })
 })

 // UPDATE USER ROLE - ADMIN
 
 const updateUserRole=catchAsyncError(async(req,res,next)=>{
    const newUserData={
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    }
    let user=await User.findById(req.params.id)
    if(!user){
        return new ErrorHandler('User does not exist',400)
    }

     user=await User.findByIdAndUpdate(req.params.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).json({
        success:true,
        user
    })
})




module.exports={register,login,logout,forgotPassword,resetPassword,getUserDetails,updateProfile,getAllUsers,getUser,updateUserRole,deleteUser}