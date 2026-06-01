import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const Orders = ({ token }) => {

    const [orders, setOrders] = useState([]);

    const fetchAllOrders = async () => {

        if (!token) {
            return null;
        }

        try {
            const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } });
            if (response.data.success) {
                setOrders((response.data.orders || response.data.data || []).reverse());
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const statusHandler = async (event, orderId) => {
        try {
            const response = await axios.post(backendUrl + '/api/order/status', { orderId, status: event.target.value }, { headers: { token } });
            if (response.data.success) {
                await fetchAllOrders();
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        fetchAllOrders()
    }, [token])

    return (
        <div>
            <h3 className='mb-4 font-semibold text-lg text-gray-700'>Order Page</h3>
            <div className='flex flex-col gap-4'>
                {orders.map((order, index) => (
                    <div key={index} className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-4 items-start border border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700 bg-white shadow-sm rounded hover:shadow transition-shadow'>
                        <img className='w-12 sm:w-16 object-contain' src={assets.parcel_icon} alt="Parcel" />
                        <div>
                            <div className='font-semibold text-gray-900 mb-2'>
                                {(order.items || []).map((item, idx) => {
                                    if (idx === order.items.length - 1) {
                                        return <span key={idx}>{item.name} x {item.quantity} <span className='text-gray-400 font-normal'>({item.size})</span></span>
                                    } else {
                                        return <span key={idx}>{item.name} x {item.quantity} <span className='text-gray-400 font-normal'>({item.size})</span>, </span>
                                    }
                                })}
                            </div>
                            <p className='font-medium text-gray-900 mt-3 mb-1'>{order.address.firstName + " " + order.address.lastName}</p>
                            <div className='text-gray-500'>
                                <p>{order.address.street + ","}</p>
                                <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
                            </div>
                            <p className='mt-3 text-gray-500'>{order.address.phone}</p>
                        </div>
                        <div>
                            <p className='text-sm sm:text-[15px]'>Items : {(order.items || []).length}</p>
                            <p className='mt-2'>Method : {order.paymentMethod}</p>
                            <p>Payment : {order.payment ? 'Done' : 'Pending'}</p>
                            <p>Date : {new Date(order.date).toLocaleDateString()}</p>
                        </div>
                        <p className='text-sm sm:text-[15px] font-semibold text-gray-900'>{currency}{order.amount}</p>
                        <select onChange={(event) => statusHandler(event, order._id)} value={order.status} className='p-2 font-semibold border border-gray-300 rounded bg-white text-gray-700 outline-none cursor-pointer focus:border-gray-500 transition-colors'>
                            <option value="Order Placed">Order Placed</option>
                            <option value="Packing">Packing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Out for delivery">Out for delivery</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Orders