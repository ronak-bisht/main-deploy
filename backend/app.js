const express=require('express')
const app=express()
const cookieParser=require('cookie-parser')
const cors=require('cors')
const bodyParser=require('body-parser')
const path=require('path')
const fileUpload=require('express-fileupload')
app.use(cookieParser())
app.use(cors({
    origin:["http://127.0.0.1:5173","http://localhost:3000"],
    credentials:true
}))

app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())
const buildPath=path.join(__dirname,"../frontend/build")
app.use(express.static(buildPath))
const {isAuthenticateUser}=require('./middleware/auth.js')
const {authorizeRoles}=require('./middleware/auth.js')
// const errorMiddleware=require('./middleware/error.js')
// app.use(errorMiddleware)
app.use(express.json())

const {getAllProducts,createProduct,updateProduct,deleteProduct,getProductDetails, createProductReview, getPreSignedUrls}=require('./controllers/productController.js')

const {register,login, logout, forgotPassword, resetPassword, getUserDetails, updateProfile, getAllUsers, getUser, deleteUser, updateUserRole}=require('./controllers/userController.js')
const { newOrder, myOrders,getSingleOrder, getAllOrders, updateOrder, deleteOrder } = require('./controllers/orderController.js')
//Routes
const {payment,checkout} =require('./controllers/paymentController.js')
app.get('/all-product',getAllProducts)

app.post('/admin/product/new',isAuthenticateUser,authorizeRoles('admin'),createProduct)
app.put('/admin/product/:id',isAuthenticateUser,authorizeRoles('admin'),updateProduct)
app.delete('/admin/product/:id',isAuthenticateUser,authorizeRoles('admin'),deleteProduct)
app.get('/product/:id',getProductDetails)
app.put('/review',isAuthenticateUser,createProductReview)



app.post('/register',register)
app.post('/backend/login',login)
app.get('/logout',logout)
app.post('/password/forgot',forgotPassword)
app.put('/password/reset/:token',resetPassword)
app.get('/me',isAuthenticateUser,getUserDetails)
app.put('/me/update',isAuthenticateUser,updateProfile)
app.get('/admin/users',isAuthenticateUser,authorizeRoles('admin'),getAllUsers)
app.get('/admin/user/:id',isAuthenticateUser,authorizeRoles('admin'),getUser)
app.delete('/admin/user/:id',isAuthenticateUser,authorizeRoles('admin'),deleteUser)
app.put('/admin/user/:id',isAuthenticateUser,authorizeRoles('admin'),updateUserRole)



app.post('/order/new',isAuthenticateUser,newOrder)
app.get('/order/:id',isAuthenticateUser,getSingleOrder)
app.get('/orders/me',isAuthenticateUser,myOrders)
app.get('/admin/orders',isAuthenticateUser,authorizeRoles('admin'),getAllOrders)
app.put('/admin/order/:id',isAuthenticateUser,authorizeRoles('admin'),updateOrder)
app.delete('/admin/order/:id',isAuthenticateUser,authorizeRoles('admin'),deleteOrder)

app.post('/checkout',checkout)
app.post('/payment',payment)

app.get('/getURL',isAuthenticateUser,authorizeRoles('admin'),getPreSignedUrls)
// app.delete('/deleteS3',isAuthenticateUser,authorizeRoles('admin'),deleteS3)

module.exports=app