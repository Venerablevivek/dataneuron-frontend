import React, { useState } from 'react'
import axios from 'axios';
import { BASE_URL } from '../config.js';
import toast from 'react-hot-toast';
import Loading from './Loader/Loading.js';


const Count = () => {
    const [count, setCount] = useState();
    const [loading, setLoading] = useState(false);

    //fetch all the counts
    const fetchCount = async(e) =>{
        try {
            setLoading(true);
            const response = await axios.get(`${BASE_URL}/count`);
      
            if(response.status!==200){
              return toast.error("cannot fetch count");
            }

            console.log("count is ", response.data.count);
            setCount(response.data.count);
            toast.success("count fetched successfully");
            setLoading(false);
          } catch (error) {
            setLoading(false);
            console.log(`Error while fetching count`,error);
            toast.error("Couldn't fetch count");
          }
          setLoading(false);
      }
    
      useState(()=>{
        fetchCount();
      },[count]);

  return (
    <div className='flex justify-center items-center flex-col' >
    <h1 className='text-4xl font-bold mb-5 '
    >Count of Data</h1>
        {
            loading && (
                <Loading/>
            )
        }
        {
            !loading && (
                <div>
                    Count of added and update is {count}
                </div>
            )
        }

    </div>
  )
}

export default Count