const Order=require('../Models/orderModel.js')
const Product=require('../Models/productModel.js')
const ErrorHandler=require('../utils/errorHandler.js')
const catchAsyncErrors=require('../middleware/catchAsyncError.js')


//Create new Order

const newOrder=catchAsyncErrors(async (req,res,next)=>{
   
    const {shippingInfo,orderItems,paymentInfo,itemsPrice,taxPrice,shippingPrice,totalPrice}=req.body
    console.log(req.body)
    const order=await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt:Date.now(),
        user:req.user._id,
    })
    res.status(201).json({
        success:true,
        order
    })
})


// get single order

const getSingleOrder=catchAsyncErrors(async(req,res,next)=>{
    const order=await Order.findById(req.params.id).populate("user","name email")
    if(!order){
        return next(new ErrorHandler("order not found with this id",404))
    }
    res.status(200).json({
        success:true,
        order
    })
})

//get logged in user
const myOrders=catchAsyncErrors(async(req,res,next)=>{
    const orders=await Order.find({user:req.user._id})
   
   
    res.status(200).json({
        success:true,
        orders
        
    })
})

//get all order
const getAllOrders=catchAsyncErrors(async(req,res,next)=>{
    const orders=await Order.find()
   
    let totalAmount=0

    orders.forEach(order=>{
        totalAmount=order.totalPrice
    })
   
    res.status(200).json({
        success:true,
        totalAmount,
        orders
        
    })
})


//Update order --- Admin
const updateOrder=catchAsyncErrors(async(req,res,next)=>{
    const order=await Order.findById(req.params.id)
    
    if(!order){
        return next(new ErrorHandler("Order not found with this id",404))
    }
   
    if(order.orderStatus=="Delivered"){
        return next(new ErrorHandler("You have already delivered this product",404))
    }

    order.orderItems.forEach(async(order)=>{
        await updateStock(order.product,order.quantity)
    })
   
    order.orderStatus=req.body.status
    if(req.body.status==="Delivered"){
        order.deliveredAt=Date.now()
    }
    await order.save({validateBeforeSave:false})
    res.status(200).json({
        success:true,
        
        
    })
})
async function updateStock(id,quantity){
    const product=await Product.findById(id)
    product.stock=quantity-1
    await product.save({validateBeforeSave:false})
}

//  delete order -- Admin
const deleteOrder=catchAsyncErrors(async(req,res,next)=>{
    const order=await Order.findById(req.params.id)
   
    if(!order){
        return next(new ErrorHandler("Order not found with this id",404))
    }
    await Order.findByIdAndDelete(req.params.id)
    res.status(200).json({
        success:true,
        
        
    })
})

module.exports= {newOrder,getSingleOrder,myOrders,getAllOrders,deleteOrder,updateOrder}