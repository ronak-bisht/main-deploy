const app=require('./app.js')
const dotenv=require("dotenv")
const connectDB=require('./config/database.js')
const errorMiddleware=require('./middleware/error.js')
const cors=require('cors')
const cookieParser=require('cookie-parser')
app.use(cookieParser())
const cloudinary=require('cloudinary')
app.use(cors({
    origin:["http://127.0.0.1:5173","http://localhost:3000"],
    credentials:true
}))
process.on('uncaughtException',(err)=>{
    console.log(`Error: ${err.message}`);
    console.log('shutting down server due to uncaught exception')
    process.exit(1)
})
//Config
dotenv.config({path:"config/config.env"})

//connecting to DB
 connectDB()
 cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
 })
 app.use(errorMiddleware)
const server=app.listen(process.env.PORT,()=>{
    console.log(`Server is running on http://localhost:${process.env.PORT}`)
})

//unhandled promise rejection
process.on("unhandledRejection",(err)=>{
    console.log(`Error:" ${err.message}`)
    console.log('Shutting down the server due to Unhandled promise Rejection')
    server.close(()=>{
        process.exit(1);
    })
})

