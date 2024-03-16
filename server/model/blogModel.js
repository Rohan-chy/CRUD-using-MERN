const mongoose=require('mongoose')

const blogSchema=new mongoose.Schema({
    title:{
        type:String
    },
    sub_title:{
        type:String
    },
    description:{
        type:String
    }
},
{
    timestamps:true
})

module.exports=mongoose.model("Blog",blogSchema);