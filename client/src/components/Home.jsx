import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
    const [blogs,setBlogs]=useState();

    const fetchData=async()=>{
        const res=await axios.get('http://localhost:5000/blogs')
        setBlogs(res.data.data);
    }

    useEffect(()=>{
        fetchData();
    },[])
    console.log(blogs)
  return (
    <div className='flex flex-col gap-10'>
        <nav className='w-full flex items-center justify-between px-[80px] py-4 text-white bg-slate-500'>
            <h1 className='font-medium'>Blog</h1>
            <ul className='flex items-center gap-5'>
                <li>Home</li>
                <li>About</li>
                <li>Services</li>
                <li>Contact</li>
                <li>Address</li>
            </ul>
        </nav>
        <h1 className='text-center font-bold text-2xl'>All Blogs</h1>
        <div className='flex items-center gap-5 px-[80px] '>
      {
        blogs?.map((item,i)=>(
            <div key={item._id} className=' w-[300px]  text-center border-2 cursor-pointer rounded capitalize py-2'>
                <p className='font-bold'>{item.title}</p>
                <p>{item.sub_title}</p>
                <p>{item.description}</p>
                <br /><br />
                <Link to={`/blogs/${item._id}`}><button className='p-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-400'>See more</button></Link>
            </div>
        ))
      } 
    </div>

    <Link to={`/createBlog`} className='w-[110px] p-4 bg-green-500 text-white rounded-full hover:bg-green-400'><button>Post Blogs</button></Link>
    </div>
  )
}

export default Home;