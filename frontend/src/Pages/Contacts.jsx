import React from 'react'
import Title from '../Components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../Components/NewsLetterBox'
const Contacts = () => {
    return (
        <div>
            <div className='text-2xl text-center border-t border-gray-200 pt-14'>
                <Title text1='CONTACT' text2='US' />
            </div>
            <div className='py-10 px-2 sm:px-6 md:px-0 flex flex-col md:flex-row gap-10'>
                <img className='w-full md:max-w-[420px] object-cover' src={assets.contact_img} alt="" />
                <div className='flex flex-col justify-center gap-6 text-gray-600'>
                    <b className='text-2xl text-gray-600'>Our Store</b>
                    <p className='text-sm'>Patna, Bihar 801503</p>
                    <p className='text-sm'>[EMAIL_ADDRESS]</p>
                    <p className='text-sm'>+91 7361985243</p>
                    <b className='text-gray-600 text-2xl'>Careers At GenZX</b>
                    <p>Join our growing team and be a part of something special. We're always looking for passionate individuals to help us create amazing experiences for our customers.</p>
                    <div>
                        <button className='text-sm mt-2 text-black border border-gray-600 py-5 px-6 hover:bg-black hover:text-white transition ease-in-out'>Explore Jobs</button>
                    </div>
                </div>
            </div>
            <div className='mt-14 mb-[-15px]'>
                <NewsLetterBox />
            </div>
        </div>
    )
}

export default Contacts