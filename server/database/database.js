const mongoose=require('mongoose')

exports.databaseConnection=async()=>{
    try{
    await mongoose.connect(process.env.MONGODB_URL)
    console.log("data connection success")
    }
    catch(e){
        console.log("database connection error:",e);
    }
}