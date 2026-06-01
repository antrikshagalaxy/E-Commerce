import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
const backendUrl = import.meta.env.VITE_BACKEND_URL;
import { toast } from 'react-toastify'
import { currency } from '../App'
import { assets } from '../assets/assets';


const List = ({ token }) => {

    const [list, setList] = useState([]);

    const fetchlist = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list');
            if (response.data.success) {
                setList(response.data.products);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const removeProduct = async (id) => {
        try {
            const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } });
            if (response.data.success) {
                toast.success(response.data.message);
                await fetchlist();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        fetchlist();
    }, []);


    return (
        <>
            <p className='mb-2 font-semibold text-lg text-gray-700'>All Products List</p>
            <div className='flex flex-col gap-2'>
                {/* ------ List Header ------ */}
                <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-4 border border-gray-00 bg-gray-100 text-sm'>
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b className='text-center'>Action</b>
                </div>

                {/* ------ List Data ------ */}
                {
                    list.map((item, index) => (
                        <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-2 px-4 border border-gray-300 text-sm hover:bg-gray-50 transition-colors' key={index}>
                            <img className='w-12 h-12 object-cover rounded' src={item.image[0]} alt="" />
                            <p className='font-medium'>{item.name}</p>
                            <p className='hidden md:block'>{item.category}</p>
                            <p className='hidden md:block'>{currency}{item.price}</p>
                            <p onClick={() => removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg font-bold text-red-500 hover:text-red-700 transition-colors w-full'>X</p>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default List