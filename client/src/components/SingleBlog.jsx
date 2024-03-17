import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const singleDataBlog = () => {
    const {id}=useParams();
    const navigate=useNavigate();

     // server localhost url
     const server_url=import.meta.env.VITE_URL;

    const [singleData,setsingleData]=useState({})


    // read singleData blog
    const fetchsingleData=async()=>{
        const res=await axios.get(`${server_url}/blogs/${id}`);

        if(res.status===200){
            setsingleData(res.data.data);
        }
    }

    useEffect(()=>{
        fetchsingleData()
    },[])


    // delete blog
    const deleteBlog=async()=>{
        const res=await axios.delete(`${server_url}/blogs/${id}`);

        if(res.status===200){
            alert('deleted successfully')
            navigate('/');
        }
    }

  return (
    <div className='flex flex-col items-center justify-center'>
        <h1 className='font-bold text-3xl'>singleData Blog</h1>
        <br /><br />
       <div>
            <div key={singleData._id} className=' w-[300px]  text-center border-2 cursor-pointer rounded capitalize py-2'>
                <p>{singleData.title}</p>
                <p>{singleData.sub_title}</p>
                <p>{singleData.description}</p>
                <br /><br />
                <button onClick={deleteBlog}className='bg-red-500 text-white px-3 py-2 rounded-full hover:bg-red-400'>Delete</button>
                <Link to={`/update/${singleData._id}`}><button className='bg-red-500 text-white px-3 py-2 rounded-full hover:bg-red-400'>Update</button></Link>

            </div>
       </div>
       <br />
        <Link to={`/`}><button className='p-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-400'>Back to Home</button></Link>
    </div>
  )
}

export default singleDataBlog