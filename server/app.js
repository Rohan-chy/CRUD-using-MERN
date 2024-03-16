const express=require('express');
const { databaseConnection } = require('./database/database');
const blogModel = require('./model/blogModel');
const cors=require('cors');
const app=express();

app.use(cors({
origin:'http://localhost:5173'
}));

app.use(express.json())
app.use(express.urlencoded({extended:true}))


// database connection
databaseConnection();


app.get('/',(req,res)=>{
    res.status(200).json({
        message:"success"
    })
})

//create blog
app.post('/createBlog',async(req,res)=>{
    const {title,subTitle,des}=req.body;

   await blogModel.create({
        title:title,
        sub_title:subTitle,
        description:des
    })

    res.status(201).json({
        message:"blog created successfully"
    })
})

//read blog(all blogs)
app.get("/blogs",async(req,res)=>{
    const blogs=await blogModel.find();
    console.log(blogs)

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
    const {title,subTitle,des}=req.body;
    
    await blogModel.findByIdAndUpdate(id,{
        title:title,
        sub_title:subTitle,
        description:des
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
    console.log("server started at port 5000")
})