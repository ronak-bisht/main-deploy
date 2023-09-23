const Product=require('../Models/productModel.js')
const express=require('express')
const mongoose=require('mongoose');
const catchAsyncError=require('../middleware/catchAsyncError.js')
const ErrorHandler = require('../utils/errorHandler.js');
const ApiFeatures=require('../utils/features.js')
const {S3Client,PutObjectCommand,DeleteObjectCommand}=require('@aws-sdk/client-s3')
const {getSignedUrl}=require('@aws-sdk/s3-request-presigner')
// const redis=require('redis')
// const redisUrl='redis://127.0.0.1:6379'
// const client=redis.createClient(6379,'127.0.0.1')

// client.connect()
// client.on('connect',function(){
//     console.log('connected to redis')
// })
//Create Product --Admin
const s3Client=new S3Client({
    region:"ap-south-1",
    credentials:{
        accessKeyId:'AKIARYG2BZIEYZWBHBON',
        secretAccessKey:'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'
    }
})
createProduct=catchAsyncError(async(req,res,next)=>{
    req.body.user=req.user.id
    const product=await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
})

// Get ALL Products
getAllProducts=catchAsyncError(async(req,res,next)=>{
   
//    const data= await client.get("products")
//    if(data){
//     console.log('hell')
//     console.log(data)
//      res.status(200).json({
//         success:true,
//         products:JSON.parse(data)
//      })
//      return
//    }

//    console.log('set function')
    
    const resultPerPage=4
    const productCount=await Product.countDocuments()
    
    // const apiFeatures=new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage)
    const apiFeatures=new ApiFeatures(Product.find(),req.query).search().filter()
    const products=await apiFeatures.query
    res.status(200).json({
        success:true,
        products,
        productCount,
        resultPerPage
    })

    // const dat=await client.set('products',JSON.stringify(products))
})


//Update Product ---Admin
const updateProduct=catchAsyncError(async(req,res,next)=>{
    let product=await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found",404))
    }


    product=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true,useFindAndModify:false})
    res.status(200).json({
        success:true,
        product,
        
    })
})

const getPreSignedUrls=catchAsyncError(async(req,res,next)=>{
    let urls=[]
    let link=""
    let name=""
    const count=req.query.fileCount || 1
    console.log(count)
    for(let i=0;i<count;i++){
        name=Date.now()
        const command=new PutObjectCommand({
            Bucket:'fiend',
            Key:`admin-uploads/${name}`,
            ContentType:'image/jpeg'
        })
         link=await getSignedUrl(s3Client,command)

        if(!link){
            return next(new ErrorHandler("there is a problem",404))
        }
        urls.push({link,name})
    }
   
    res.status(200).json({
        urls
    })

})

// const deleteS3=catchAsyncError(async(req,res,next)=>{
//     const product=await Product.findById(req.params.id);
//     if(!product){
//         return next(new ErrorHandler("Product not found",404))
//     }
//     const img=product.images
//     img.map(async (img)=>{
//         const command=new DeleteObjectCommand({
//             Bucket:'fiend',
//             Key:`admin-uploads/${img.url}`,
            
            
//         })
//         const url=await s3Client.send(command)
//     })
// })

//Delete Product 
const deleteProduct=catchAsyncError(async(req,res,next)=>{
    
        const product=await Product.findById(req.params.id);
        
        const img=product.images
        img.map(async (img)=>{
            const command=new DeleteObjectCommand({
                Bucket:'fiend',
                Key:`admin-uploads/${img.url}`,
                
                
            })
            const url=await s3Client.send(command)
        })
    
        if(!product){
            return next(new ErrorHandler("Product not found",404))
        }
        
    await Product.findByIdAndDelete(req.params.id)
    res.status(200).json({
        status:true,
        message:"Product deleted succesfully"
    })
})

const getProductDetails=catchAsyncError(async(req,res,next)=>{
    const product=await Product.findById(req.params.id)
    const productCount=await Product.countDocuments()
    if(!product){
        return next(new ErrorHandler("Product not found",404))
    }
    res.status(200).json({
        status:true,
        product,
        productCount
    })
})

const createProductReview= catchAsyncError(async(req,res,next)=>{

    const {rating,comment,productId}=req.body
    const review ={
        user:req.user._id,
        name:req.user.name,
        rating:Number(rating),
        comment
    }

    const product = await Product.findById(productId)

    const isReviewed = product.reviews.find(rev=>rev.user.toString()===req.user._id.toString())
    if(isReviewed){
        product.reviews.forEach(rev=>{
            if(rev.user.toString()===req.user._id.toString())
            rev.rating=rating,
            rev.comment=comment
        })
    }else{
        product.reviews.push(review)
        product.numOfReviews=product.reviews.length
    }
    let avg=0
    product.ratings=product.reviews.forEach(rev=>{
        avg+=rev.rating
    })

    product.ratings=avg/product.reviews.length

    await product.save({validateBeforeSave:false})
    res.status(200).json({
        success:true,
        message:"review succesfully"
    })

})


const getProductReviews=catchAsyncError(async (req,res,next)=>{
    const product = await Product.findById(req.query.id)

    if(!product){
        return next(new ErrorHandler('product not found',404))
    }
    res.status(200).json({
        success:true,
        reviews:product.reviews
    })
})

const deleteReview=catchAsyncError(async (req,res,next)=>{
    const product = await Product.findById(req.query.id)
    if(!product){
        return next(new ErrorHandler('product not found',404))
    }
    const reviews=product.reviews.filter(rev)
})
module.exports={getAllProducts,createProduct,updateProduct,deleteProduct,getProductDetails,createProductReview,getPreSignedUrls}