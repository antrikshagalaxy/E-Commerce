import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';
const BestSeller = () => {

    const { products } = useContext(ShopContext)
    const [BestSeller, setBestSeller] = useState([])

    useEffect(() => {
        const bestproduct = products.filter((item) => (item.bestseller == true));
        setBestSeller(bestproduct.slice(0, 5));
    }, [products])

    return (

        <div className='my-10'>
            <div className='text-center py-8 text-3xl font-medium'>
                <Title text1='BEST ' text2='SELLERS' />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>Here Some of Our Best Selling Products.</p>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {BestSeller.map((item, index) => {
                    return <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                })}
            </div>
        </div>

    )
}

export default BestSeller