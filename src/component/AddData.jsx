import React, { useState } from 'react'
import axios from 'axios';
import { BASE_URL } from '../config.js';
import toast from 'react-hot-toast';
import Loading from './Loader/Loading.js';

const AddData = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData]=useState({
        name:'',
        age:''
    });

    const handleInputChange = (e) =>{
        setFormData({
          ...formData, [e.target.name]: e.target.value
        });
      }

      // fetch user data
  const fetchData = async()=>{
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/add`);

      if(response.status!==200){
        return toast.error("Data cannot fetched");
      }
      setData(response.data.data);
      toast.success("Data fetched successfully");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(`Error while fetching data`,error);
      toast.error("Couldn't fetch data");
    }
  }

  // Add new user data and clear previous data
  const handleSubmit = async(e) =>{
    try {
        setLoading(true);
        const response = await axios.post(`${BASE_URL}/add`,formData);
        //console.log("handle submit 1 is", response.data);
  
        if(response.status!==201){
          return toast.error("Data cannot add");
        }

        // const arr = Object.keys(response.data).map(key => response.data[key]);

        // console.log("response.data is ", arr);
        //setData(response.data);
        toast.success("Data added successfully");
        setLoading(false);
        alert("Data added successfully and Please, Refresh again");
      } catch (error) {
        setLoading(false);
        console.log(`Error while adding data`,error);
        toast.error("Couldn't add data");
      }
      setLoading(false);
  }

  useState(()=>{
    fetchData();
  },[]);

  return (
    <div className='flex justify-center items-center flex-col' >
        <h1 className='text-4xl font-bold mb-[10px] '
        >User Data</h1>
            {
                loading && (
                    <Loading/>
                )
            }
            {
                !loading && (
                    <>
                    {
        data?.map((item,ind)=>(
          <div key={ind} className='mb-10' >
            <p>Name : {item.name}</p>
            <p>Age : {item.age}</p>
          </div>
        ))
      }
        <form className='flex justify-center items-center gap-2 flex-col ' >
            <div className='flex gap-2 items-center' >
                Name : 
                <input 
                    type='text'
                    value={formData.name}
                    name='name'
                    onChange={(e)=>handleInputChange(e)}
                    className=' text-slate-800 px-1 py-2 rounded-md text-lg font-semibold outline-none '
                />
            </div>
            <div className='flex gap-2 items-center' >
                Age : 
                <input 
                    type='number'
                    value={formData.age}
                    name='age'
                    onChange={(e)=>handleInputChange(e)}
                    className=' text-slate-800 px-1 py-2 rounded-md text-lg font-semibold outline-none '
                />
            </div>

            <button onClick={(e)=>handleSubmit(e)}  className='rounded-md bg-blue-500 px-3 py-2 font-semibold hover:bg-violet-500 transition-all duration-200 ' >Add New Data</button>
        </form>
                    </>
                )
            }
    </div>
  )
}

export default AddData