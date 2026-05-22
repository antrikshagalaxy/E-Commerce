import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Title from '../Components/Title'
import { assets } from '../assets/assets'
import CartTotal from '../Components/CartTotal'



const Cart = () => {
    const { cartItems, getCartCount, products, currency, delivery_fee, updateQuantity, getTotalCartAmount, navigate } = useContext(ShopContext);
    const [cartData, setCartData] = useState([]);
    useEffect(() => {
        const tempData = [];
        for (const item in cartItems) {
            for (const size in cartItems[item]) {
                if (cartItems[item][size] > 0) {
                    tempData.push({
                        _id: item,
                        size: size,
                        quantity: cartItems[item][size]
                    })
                }
            }
        }
        setCartData(tempData);
    }, [cartItems]);

    return (
        <div className='border-t pt-14'>
            <div className='text-2xl mb-5 font-medium'>
                <Title text1='YOUR' text2='CART' />
            </div>
            <div>{
                cartData.map((item, index) => {
                    const productdata = products.find((i) => (i._id == item._id))
                    return (
                        <div key={index} className='border-t border-b py-4 text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4 '>
                            <div className='flex items-start gap-6'>
                                <img className='w-16 sm:w-20 ' src={productdata.image[0]} />
                                <div className=''>
                                    <p className='text-xs sm:text-lg font-medium'>{productdata.name}</p>
                                    <div className='flex items-center mt-2 gap-5'>
                                        <p>{currency}{productdata.price}</p>
                                        <p className='text-gray-600'>{item.size}</p>
                                    </div>
                                </div>
                            </div>
                            <input onChange={(e) => (e.target.value) == '' || (e.target.value) == '0' ? updateQuantity(item._id, item.size, 1) : updateQuantity(item._id, item.size, Number(e.target.value))} type="number" className='border max-w-8 sm:max-w-16 px-1 sm:px-2 py-1' min={1} defaultValue={item.quantity} />
                            <img onClick={() => updateQuantity(item._id, item.size, 0)} src={assets.bin_icon} className='w-4 sm:w-5 cursor-pointer mr-4' alt="" />
                        </div>
                    )
                })
            }
            </div>
            <div className='flex justify-end my-20'>
                <div className='w-full sm:w-[450px]'>
                    <CartTotal />
                    <button onClick={() => { navigate("/placeorder") }} className='w-full mt-4 py-2 bg-black text-white active:bg-gray-800 transition-colors cursor-pointer'>PROCEED TO CHECKOUT</button>
                </div>
            </div>
        </div>
    )
}

export default Cart