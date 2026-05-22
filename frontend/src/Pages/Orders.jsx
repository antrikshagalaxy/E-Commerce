import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Title from '../Components/Title'

const Orders = () => {
    const { products, currency } = useContext(ShopContext);


    return (
        <div className='border-t pt-16'>
            <div className='text-2xl'>
                <Title text1='YOUR' text2='ORDERS' />
            </div>
            <div>
                {
                    products.slice(1, 4).map((product, index) => {
                        return (
                            <div className='border-t border-b border-gray-200 py-4 mt-2 text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4' key={index}>
                                {/* Product Info */}
                                <div className='flex items-start gap-6 text-sm'>
                                    <img className='border border-gray-100 w-16 sm:w-20' src={product.image[0]} alt={product.name} />
                                    <div>
                                        <p className='font-semibold text-sm sm:text-base'>{product.name}</p>
                                        <div className='flex items-center gap-2 sm:gap-3 mt-1 text-sm sm:text-base text-gray-700'>
                                            <p className='text-base sm:text-lg'>{currency}{product.price}</p>
                                            <p>M</p>
                                            <p>1</p>
                                        </div>
                                        <p className='mt-2'>Date : <span className='text-gray-400'>20/05/2026</span></p>
                                    </div>
                                </div>
                                {/* Status */}
                                <div className='flex items-center gap-2'>
                                    <p className='bg-green-500 min-w-2 h-2 rounded-full'></p>
                                    <p className='text-sm sm:text-base'>Ready to Ship</p>
                                </div>
                                {/* Track Button */}
                                <button className='bg-white text-gray-900 border border-gray-300 text-sm sm:text-base px-4 py-2 cursor-pointer'>
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