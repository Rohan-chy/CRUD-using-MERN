import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const CreateBlog = () => {
    const navigate=useNavigate();

    // server localhost url
    const server_url=import.meta.env.VITE_URL;


    //object to store the values of users
    const [blog,setBlog]=useState({
        title:'',
        sub_title:'',
        description:''
    })

    // accessing value from users through input tag
    const handleBlog=(e)=>{
        const {name,value}=e.target;
        setBlog({...blog,[name]:value})
    }

    //posting blog
    const postBlog=async(e)=>{
        try{
            e.preventDefault();
            const res=await axios.post(`${server_url}/createBlog`,blog)
            if(res.status===201){
                alert(res.data.message)
                navigate('/')
            }
        }
        catch(e){
                console.log("error",e)
        }
    }

  return (
    <div className='flex flex-col items-center gap-10 pt-10'>
        <h1 className='font-bold text-3xl'>Post Blogs</h1>
        <form onSubmit={postBlog} className='w-[500px] h-[400px] flex flex-col gap-5 items-center border-3 bg-slate-400 py-5 text-xl'>
            <div>
                <p>Title</p>
                <input type="text" name="title" onChange={handleBlog} className='w-[400px] h-[40px] outline-none px-3'/>
            </div>
            <div>
                <p>Sub-Title</p>
                <input type="text" name="sub_title" onChange={handleBlog} className='w-[400px] h-[40px] outline-none px-3'/>
            </div>
            <div>
                <p>Description</p>
                <textarea name="description" cols="30" rows="10" onChange={handleBlog} className='w-[400px] h-[70px] outline-none px-3'></textarea>
            </div>

            <button type="submit" className='bg-green-700 w-[400px] h-[50px] text-white hover:bg-green-600'>Post</button>
        </form>
    </div>
  )
}

export default CreateBlog