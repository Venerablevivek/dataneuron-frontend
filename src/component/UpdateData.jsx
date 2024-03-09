import React, { useState } from 'react'
import axios from 'axios';
import { BASE_URL } from '../config.js';
import toast from 'react-hot-toast';
import Loading from './Loader/Loading.js';


const UpdateData = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData]=useState({
        oldName:'',
        name:'',
        age:''
    });

    const handleInputChange = (e) =>{
        setFormData({
          ...formData, [e.target.name]: e.target.value
        });
      }

      //update the user data
      const handleUpdate = async(e) =>{
        try {
            setLoading(true);
            const response = await axios.put(`${BASE_URL}/update`,formData);
      
            if(response.status!==200){
              return toast.error("Data cannot update");
            }
    
            toast.success("Data updated successfully and Please, Refresh again");
            setLoading(false);
          } catch (error) {
            setLoading(false);
            console.log(`Error while updating data`,error);
            toast.error("Couldn't update data");
          }
          setLoading(false);
      }

  return (
    <div className='flex justify-center items-center flex-col' >
    <h1 className='text-4xl font-bold mb-5 '
    >Update Data</h1>
        {
            loading && (
                <Loading/>
            )
        }
        {
            !loading && (
                <>
    <form className='flex justify-center items-center gap-2 flex-col ' >
    <div className='flex gap-2 items-center' >
            Old Name : 
            <input 
                type='text'
                value={formData.oldName}
                name='oldName'
                onChange={(e)=>handleInputChange(e)}
                className=' text-slate-800 px-1 py-1 rounded-md text-lg font-semibold outline-none '
            />
        </div>
        <div className='flex gap-2 items-center' >
            Updated Name : 
            <input 
                type='text'
                value={formData.name}
                name='name'
                onChange={(e)=>handleInputChange(e)}
                className=' text-slate-800 px-1 py-1 rounded-md text-lg font-semibold outline-none '
            />
        </div>
        <div className='flex gap-2 items-center' >
            Updated Age : 
            <input 
                type='number'
                value={formData.age}
                name='age'
                onChange={(e)=>handleInputChange(e)}
                className=' text-slate-800 px-1 py-1 rounded-md text-lg font-semibold outline-none '
            />
        </div>

        <button onClick={(e)=>handleUpdate(e)}  className='rounded-md bg-blue-500 px-3 py-2 font-semibold hover:bg-violet-500 transition-all duration-200 ' >
        Update Data</button>
    </form>
                </>
            )
        }
</div>
  )
}

export default UpdateData