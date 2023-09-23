const mongoose=require('mongoose')


const connectDB=()=>{
    mongoose.connect(process.env.DB_URI).then(()=>{
        console.log("mongo Db connect with server")
    });
}
module.exports=connectDB