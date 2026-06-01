import React, { useContext, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Title from '../Components/Title'
import CartTotal from '../Components/CartTotal'
import stripe_logo from '../assets/stripe_logo.png'
import { toast } from 'react-toastify'
import axios from 'axios'


const PlaceOrder = () => {
    const { navigate, backendUrl, token, cartItems, setCartItems, products, delivery_fee, getTotalCartAmount } = useContext(ShopContext);
    const [method, setMethod] = useState('cod');

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    })

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            let orderItems = [];
            for (const i in cartItems) {
                for (const j in cartItems[i]) {
                    if (cartItems[i][j] > 0) {
                        const itemInfo = structuredClone(products.find((item) => item._id === i));
                        if (itemInfo) {
                            itemInfo.size = j;
                            itemInfo.quantity = cartItems[i][j];
                            orderItems.push(itemInfo);
                        }

                    }
                }
            }

            let orderData = {
                address: formData,
                items: orderItems,
                amount: getTotalCartAmount() + delivery_fee,

            }

            switch (method) {
                case 'cod':
                    const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } })
                    if (response.data.success) {
                        setCartItems({});
                        navigate('/orders');
                        toast.success(response.data.message);
                    } else {
                        toast.error(response.data.message);
                    }
                    break;

                case 'stripe':
                    const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, { headers: { token } });
                    if (responseStripe.data.success) {
                        const { session_url } = responseStripe.data;
                        window.location.replace(session_url);
                    } else {
                        toast.error(responseStripe.data.message);
                    }
                    break;
            }



        } catch (error) {
            console.log(error)
            toast.error(error.message);
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row gap-8 sm:gap-4 justify-between pt-5 sm:pt-14 min-h-[80vh] border-t px-2 sm:px-0' >
            {/* Left Part - Delivery Information */}
            <div className='flex flex-col w-full gap-4 sm:max-w-[480px]'>
                <div className='text-xl sm:text-2xl my-3'>
                    <Title text1='DELIVERY' text2='INFORMATION' />
                </div>
                <div className='flex gap-3'>
                    <input onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 w-full rounded py-1.5 px-3.5' type="text" placeholder='First Name' required />
                    <input onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 w-full rounded py-1.5 px-3.5' type="text" placeholder='Last Name' required />
                </div>
                <input onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 w-full rounded py-1.5 px-3.5' type="email" placeholder='Email Address' required />
                <input onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 w-full rounded py-1.5 px-3.5' type="text" placeholder='Street Address' required />
                <div className='flex gap-3'>
                    <input onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 w-full rounded py-1.5 px-3.5' type="text" placeholder='City' required />
                    <input onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 w-full rounded py-1.5 px-3.5' type="text" placeholder='State' required />
                </div>
                <div className='flex gap-3'>
                    <input onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 w-full rounded py-1.5 px-3.5' type="text" placeholder='Zip/Postal Code' required />
                    <input onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 w-full rounded py-1.5 px-3.5' type="text" placeholder='Country' required />
                </div>
                <input onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 w-full rounded py-1.5 px-3.5' type="tel" placeholder='Phone Number' required />
            </div>

            {/* Right Part - Cart Total & Payment */}
            <div className='mt-2 sm:mt-8'>
                <div className='sm:mt-8 sm:min-w-80'>
                    <CartTotal />
                </div>

                <div className='mt-12'>
                    <div className='text-xl sm:text-2xl mb-3'>
                        <Title text1='PAYMENT' text2='METHOD' />
                    </div>
                    {/* Payment Method Selection */}
                    <div className='flex gap-3 flex-col sm:flex-row'>
                        <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer rounded'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
                            <img className='h-5 mx-4' src={stripe_logo} alt='Stripe' />
                        </div>
                        <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer rounded'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
                            <p className='text-gray-500 text-sm font-medium'>Cash on Delivery</p>
                        </div>
                    </div>

                    <div className='w-full text-end mt-8'>
                        <button type='submit' className='bg-black text-white w-full sm:w-auto px-16 py-3 text-sm active:bg-gray-700'>
                            PLACE ORDER
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default PlaceOrder