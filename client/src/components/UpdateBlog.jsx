import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const UpdateBlog = () => {
    const {id}=useParams();
    const navigate=useNavigate();
    const [updateData,setUpdateData]=useState({});

    const fetchUpdateData=async()=>{
        try{
            const res=await axios.get(`http://localhost:5000/blogs/${id}`)

            if(res.status===200){
                setUpdateData(res.data.data)
            }
        }
        catch(e){
            console.log(e)
        }
    }

    useEffect(()=>{
        fetchUpdateData()
    },[])


    //accessing input
    const handleInput=(e)=>{
        const {name,value}=e.target;
        setUpdateData({...updateData,[name]:value})
        console.log(updateData);
    }

    //submit updated data
    const submitUpdated=async(e)=>{
        try {
            e.preventDefault();
            const res=await axios.patch(`http://localhost:5000/blogs/${id}`,updateData)
            if(res.status===200){
                alert(res.data.message)
                navigate(`/blogs/${id}`)
            }
        } catch (error) {
          console.log(error)  
        }
    }
  return (
    <div className='flex flex-col items-center gap-10 pt-10'>
    <h1 className='font-bold text-3xl'>Post Blogs</h1>
    <form onSubmit={submitUpdated} className='w-[500px] h-[400px] flex flex-col gap-5 items-center border-3 bg-slate-400 py-5 text-xl'>
        <div>
            <p>Title</p>
            <input type="text" name="title"  onChange={handleInput} value={updateData.title} className='w-[400px] h-[40px] outline-none px-3'/>
        </div>
        <div>
            <p>Sub-Title</p>
            <input type="text" name="sub_title" onChange={handleInput} value={updateData.sub_title} className='w-[400px] h-[40px] outline-none px-3'/>
        </div>
        <div>
            <p>Description</p>
            <textarea name="description" cols="30" rows="10" onChange={handleInput} value={updateData.description} className='w-[400px] h-[70px] outline-none px-3'></textarea>
        </div>

        <button type="submit" className='bg-green-700 w-[400px] h-[50px] text-white hover:bg-green-600'>Update</button>
    </form>
</div>
  )
}

export default UpdateBlog