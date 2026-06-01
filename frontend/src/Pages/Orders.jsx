import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Title from '../Components/Title'
import axios from 'axios'
import { toast } from 'react-toastify'

const Orders = () => {
    const { backendUrl, token, currency } = useContext(ShopContext);
    const [orders, setOrders] = useState([]);

    const getOrders = async () => {
        try {
            if (!token) {
                return;
            }
            const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } })
            if (response.data.success) {
                let allOrdersItem = []
                response.data.orders.map((order) => {
                    order.items.map((item) => {
                        const itemCopy = structuredClone(item);
                        itemCopy['status'] = order.status
                        itemCopy['payment'] = order.payment
                        itemCopy['paymentMethod'] = order.paymentMethod
                        itemCopy['date'] = order.date
                        allOrdersItem.push(itemCopy)
                    })
                })
                setOrders(allOrdersItem.reverse());
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message);
        }
    }

    useEffect(() => {
        getOrders();
    }, [token])


    return (
        <div className='border-t pt-16'>
            <div className='text-2xl'>
                <Title text1='YOUR' text2='ORDERS' />
            </div>
            <div>
                {
                    orders.map((product, index) => {
                        return (
                            <div className='border-t border-b border-gray-200 py-4 mt-2 text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4' key={index}>
                                {/* Product Info */}
                                <div className='flex items-start gap-6 text-sm'>
                                    <img className='border border-gray-100 w-16 sm:w-20' src={product.image[0]} alt={product.name} />
                                    <div>
                                        <p className='font-semibold text-sm sm:text-base'>{product.name}</p>
                                        <div className='flex items-center gap-2 sm:gap-3 mt-1 text-sm sm:text-base text-gray-700'>
                                            <p className='text-base sm:text-lg'>{currency}{product.price}</p>
                                            <p>Size: {product.size}</p>
                                            <p>Quantity: {product.quantity}</p>
                                        </div>
                                        <p className='mt-2'>Date: <span className='text-gray-400'>{new Date(product.date).toDateString()}</span></p>
                                        <p className='mt-1'>Payment: <span className='text-gray-400'>{product.paymentMethod}</span></p>
                                    </div>
                                </div>
                                {/* Status */}
                                <div className='flex items-center gap-2'>
                                    <p className='bg-green-500 min-w-2 h-2 rounded-full'></p>
                                    <p className='text-sm sm:text-base'>{product.status}</p>
                                </div>
                                {/* Track Button */}
                                <button onClick={getOrders} className='bg-white text-gray-900 border border-gray-300 text-sm sm:text-base px-4 py-2 cursor-pointer hover:bg-gray-50 transition-colors'>
                                    Track Order
                                </button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Orders