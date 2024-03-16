const mongoose=require('mongoose')

exports.databaseConnection=async()=>{
    try{
    await mongoose.connect("mongodb+srv://cms:cms@cluster0.mwxrez8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    console.log("data connection success")
    }
    catch(e){
        console.log(e);
    }
}