import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../Context/ShopContext';
import { useParams, Link } from 'react-router-dom';
import { assets } from '../assets/assets';
import RelatedProducts from '../Components/RelatedProducts';

const Product = () => {

    const { currency, products, addToCart } = useContext(ShopContext);
    const { productId } = useParams();
    const [productdata, setProductdata] = useState(false);
    const [image, setimage] = useState('');
    const [size, setSize] = useState('');

    const fetchproductdata = async () => {
        products.map((item) => {
            if (item._id == productId) {
                setProductdata(item);
                setimage(item.image[0]);
                return null;
            }
        })
    }

    useEffect(() => {
        fetchproductdata();
        window.scrollTo(0, 0);
    }, [products, productId]);

    return productdata ? (
        <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
            <div className='flex flex-col sm:flex-row gap-10 sm:gap-12'>
                {/* Image section */}
                <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
                    <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
                        {productdata.image.map((item, index) => (
                            <img onClick={() => setimage(item)} key={index} src={item} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
                        ))}
                    </div>
                    <div className='w-full sm:w-[80%]'>
                        <img src={image} className='w-full h-auto' alt="" />
                    </div>
                </div>
                {/* Product Details */}
                <div className='flex-1'>
                    <h1 className='text-2xl font-medium mt-2'>{productdata.name}</h1>
                    <div className='flex gap-1 items-center mt-2'>
                        <img src={assets.star_icon} className='w-3.5' alt="" />
                        <img src={assets.star_icon} className='w-3.5' alt="" />
                        <img src={assets.star_icon} className='w-3.5' alt="" />
                        <img src={assets.star_icon} className='w-3.5' alt="" />
                        <img src={assets.star_dull_icon} className='w-3.5' alt="" />
                        <p className='text-gray-600 pl-2'>(100 reviews)</p>
                    </div>
                    <p className='font-medium mt-2 text-3xl'>{currency}{productdata.price}</p>
                    <p className='mt-5 text-gray-500 w-4/5'>{productdata.description}</p>
                    <div>
                        <h2 className='mt-5 font-semibold'>Select size</h2>
                        <div className='flex gap-2 mt-3'>
                            {productdata.sizes.map((item, index) => (
                                <button onClick={() => setSize(item)} key={index} className={`bg-gray-50 hover:bg-gray-100 w-10 h-10 rounded-sm cursor-pointer ${size == item ? "border border-orange-500" : ""}`}>{item}</button>
                            ))}
                        </div>
                    </div>
                    <button onClick={() => addToCart(productdata._id, size)} className='mt-5 bg-black text-white px-8 py-3 cursor-pointer text-sm active:bg-gray-700 transition-colors'>ADD TO CART</button>
                    <hr className='mt-8 sm:w-4/5 border-gray-300' />
                    <div className='flex flex-col gap-1 text-sm text-gray-500 mt-3'>
                        <p>100% Original product.</p>
                        <p>Cash on Delivery is available on this product.</p>
                        <p>Easy Return and Exchange Policy within 7 days.</p>
                    </div>
                </div>
            </div>
            {/* Description and Reviews */}
            <div className='mt-20'>
                <div className='flex'>
                    <b className='border px-5 py-3 text-sm text-gray-800'>Description</b>
                    <b className='border px-5 py-3 text-sm text-gray-500'>Reviews(100)</b>
                </div>
                <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
                    <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual storefront where businesses and individuals can showcase their products, interact with customers, and process transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.</p>
                    <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>
                </div>
            </div>
            {/* Display Related Products */}
            <div className='mt-20'>
                <RelatedProducts category={productdata.category} subCategory={productdata.subCategory || productdata.subcategory} />
            </div>
        </div>
    ) : <div className='opacity-0'></div>
}

export default Product
