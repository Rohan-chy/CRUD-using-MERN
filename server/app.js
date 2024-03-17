const express=require('express');
const { databaseConnection } = require('./database/database');
const blogModel = require('./model/blogModel');
const cors=require('cors');

require('dotenv').config()
const app=express();

//allowing client url to access the backend data
app.use(cors({
origin:process.env.CLIENT_URL
}));

app.use(express.json())
app.use(express.urlencoded({extended:true}))


// database connection
databaseConnection();



//create blog
app.post('/createBlog',async(req,res)=>{
    try {
        const {title,sub_title,description}=req.body;

         await blogModel.create({
        title:title,
        sub_title:sub_title,
        description:description
    })

    res.status(201).json({
        message:"blog created successfully"
    })
    } catch (error) {
        console.log("createblog error:",e)
        
    }
})

//read blog(all blogs)
app.get("/blogs",async(req,res)=>{
    try {
        const blogs=await blogModel.find();

    if(blogs.length < 0){
        res.status(404).json({
            message:"empty blogs"
        })
    }
    else{
        res.status(200).json({
            message:"data fetched successfully",
            data:blogs
        })
    }
    } catch (error) {
       console.log("read all blogs error:",e) 
    }
})

//read single blog
app.get('/blogs/:id',async(req,res)=>{
    const {id}=req.params;
    // const id=req.params.id
    //it gives data in arrayconst blog=await blogModel.find({ _id:id})
 const blog=await blogModel.findById(id);  //it gives data in object and donot have to check array length

if(blog.length==0){
    res.status(404).json({
        message:"no blog found"
    })
}
else{
    res.status(200).json({
        message:"fetched successfully",
        data:blog
    })
}

})


//update blog
app.patch('/blogs/:id',async(req,res)=>{
    const {id}=req.params;
    const {title,sub_title,description}=req.body;
    
    await blogModel.findByIdAndUpdate(id,{
        title:title,
        sub_title:sub_title,
        description:description
    })

    res.status(200).json({
        message:"updated successfully"
    })
})

//delete blog
app.delete('/blogs/:id',async(req,res)=>{
    const {id}=req.params;

    await blogModel.findByIdAndDelete(id);

    res.status(200).json({
        message:"deleted successfully"
    })
})

app.listen(5000,()=>{
    console.log(`server started at port ${process.env.PORT}`)
})