import React, { useContext, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Title from '../Components/Title'
import CartTotal from '../Components/CartTotal'
import stripe_logo from '../assets/stripe_logo.png'
import razorpay_logo from '../assets/razorpay_logo.png'


const PlaceOrder = () => {
    const { navigate } = useContext(ShopContext);
    const [method, setMethod] = useState('cod');

    return (
        <div className='flex flex-col sm:flex-row gap-8 sm:gap-4 justify-between pt-5 sm:pt-14 min-h-[80vh] border-t px-2 sm:px-0' >
            {/* Left Part - Delivery Information */}
            <div className='flex flex-col w-full gap-4 sm:max-w-[480px]'>
                <div className='text-xl sm:text-2xl my-3'>
                    <Title text1='DELIVERY' text2='INFORMATION' />
                </div>
                <div className='flex gap-3'>
                    <input className='border border-gray-300 w-full rounded py-1.5 px-3.5' type="text" placeholder='First Name' />
                    <input className='border border-gray-300 w-full rounded py-1.5 px-3.5' type="text" placeholder='Last Name' />
                </div>
                <input className='border border-gray-300 w-full rounded py-1.5 px-3.5' type="email" placeholder='Email Address' />
                <input className='border border-gray-300 w-full rounded py-1.5 px-3.5' type="text" placeholder='Street Address' />
                <div className='flex gap-3'>
                    <input className='border border-gray-300 w-full rounded py-1.5 px-3.5' type="text" placeholder='City' />
                    <input className='border border-gray-300 w-full rounded py-1.5 px-3.5' type="text" placeholder='State' />
                </div>
                <div className='flex gap-3'>
                    <input className='border border-gray-300 w-full rounded py-1.5 px-3.5' type="text" placeholder='Zip/Postal Code' />
                    <input className='border border-gray-300 w-full rounded py-1.5 px-3.5' type="text" placeholder='Country' />
                </div>
                <input className='border border-gray-300 w-full rounded py-1.5 px-3.5' type="tel" placeholder='Phone Number' />
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
                        <div onClick={() => setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer rounded'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
                            <img className='h-5 mx-4' src={razorpay_logo} alt='Razorpay' />
                        </div>
                        <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer rounded'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
                            <p className='text-gray-500 text-sm font-medium'>Cash on Delivery</p>
                        </div>
                    </div>

                    <div className='w-full text-end mt-8'>
                        <button onClick={() => navigate('/orders')} className='bg-black text-white w-full sm:w-auto px-16 py-3 text-sm active:bg-gray-700'>
                            PLACE ORDER
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlaceOrder