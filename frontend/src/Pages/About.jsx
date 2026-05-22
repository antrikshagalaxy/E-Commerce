import React from 'react'
import Title from '../Components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../Components/NewsLetterBox'

const About = () => {
    return (
        <div>
            <div className='text-2xl text-center border-t border-gray-200 pt-8'>
                <Title text1='ABOUT' text2='US' />
            </div>
            <div className='my-10 flex flex-col md:flex-row gap-10 px-2 sm:px-6 md:px-0'>
                <img className='w-full md:max-w-[420px] object-cover' src={assets.about_img} alt="" />
                <div className='flex flex-col justify-center gap-6 text-gray-600'>
                    <p>Genzx was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.</p>
                    <p>Fast forward to today, and Genzx has evolved into a trusted name in the e-commerce industry, serving thousands of customers across Patna, India. Our commitment to quality, affordability, and customer satisfaction remains unwavering, driving us to continually improve and expand our offerings.</p>
                    <b className='text-gray-800'>Our Mission</b>
                    <p>Our mission is to provide customers with a seamless and enjoyable shopping experience by offering a wide range of high-quality products at affordable prices. We strive to build long-lasting relationships with our customers by providing exceptional service and value.</p>
                </div>
            </div>

            <div className='text-4xl py-5 text-center'>
                <Title text1='WHY' text2='CHOOSE US' />
            </div>
            <div className='flex flex-col md:flex-row text-sm mb-20 gap-4'>
                <div className='border border-gray-200 px-8 py-8 md:py-16 flex flex-col gap-5'>
                    <b>Quality Assurance</b>
                    <p>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
                </div>
                <div className='border border-gray-200 px-8 py-8 md:py-16 flex flex-col gap-5'>
                    <b>Convenience</b>
                    <p>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
                </div>
                <div className='border border-gray-200 px-8 py-8 md:py-16 flex flex-col gap-5'>
                    <b>Exceptional Customer Service</b>
                    <p>Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.</p>
                </div>
            </div>
            <div className='mt-12'>
                <NewsLetterBox />
            </div>
        </div>
    )
}

export default About