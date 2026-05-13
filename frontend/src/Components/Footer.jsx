import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
                <div>
                    <Link to='/'><img src={assets.logo} className='mb-5 w-32 cursor-pointer' alt="" /></Link>
                    <p className='w-full md:w-2/3 text-gray-600'>Discover our latest collection of high-quality clothing, perfect for any occasion.</p>

                </div>
                <div>
                    <h2 className='text-bold martel-sans-regular text-xl font-medium mb-6 text-gray-700'>COMPANY</h2>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <Link to='/'><li>Home</li></Link>
                        <Link to='/about'><li>About us</li></Link>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>

                <div>
                    <h2 className='text-bold martel-sans-regular text-xl font-medium mb-6 text-gray-700'>GET IN TOUCH</h2>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li>+91-7759957177</li>
                        <li>[EMAIL_ADDRESS]</li>
                    </ul>
                </div>
            </div>

            <hr className='border border-gray-200' />
            <p className='py-5 font-medium text-center text-gray-600'>Copyright 2026© Antriksha Aman - All Rights Reserved.</p>
        </div>
    )
}

export default Footer