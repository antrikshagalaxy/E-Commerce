import React from 'react'

const NewsLetterBox = () => {

    const onSubmitHandler = (e) => {
        e.preventDefault()
    }

    return (
        <div className='text-center'>
            <h2 className='text-3xl font-medium text-gray-800'>Get 10% Off on Your First Order</h2>
            <p className='text-gray-600 mt-3'>Subscribe to our newsletter and get exclusive deals and discounts delivered straight to your inbox.</p>
            <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
                <input type='email' placeholder='Enter your email' className='sm:flex-1 w-full outline-none ' required />
                <button className='bg-black text-white py-4 px-10 text-xs cursor-pointer' type='submit'>Subscribe</button>
            </form>
        </div>
    )
}

export default NewsLetterBox