import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, Navigate, NavLink } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext'

const Navbar = () => {
    const [visible, setVisible] = useState(false)
    const { setShowsearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext)

    const logoutHandler = () => {
        navigate("/login");
        setToken("");
        localStorage.removeItem("token");
        setCartItems({});
    }


    return (
        <div className='flex items-center justify-between py-5 font-medium'>
            <Link to='/'><img src={assets.logo} className='w-36 cursor-pointer' alt="" /></Link>
            <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
                <NavLink to="/" className="flex flex-col items-center gap-1">
                    <p>HOME</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to="/collection" className="flex flex-col items-center gap-1">
                    <p>COLLECTIONS</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to="/about" className="flex flex-col items-center gap-1">
                    <p>ABOUT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to="/contacts" className="flex flex-col items-center gap-1">
                    <p>CONTACT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
            </ul>
            <div className='flex items-center gap-6'>
                <img onClick={() => setShowsearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt="" />
                <div className='group relative'>
                    <img onClick={() => { token ? null : navigate("/login") }} src={assets.profile_icon} className='w-5 cursor-pointer' alt="" />
                    {token && <div className='absolute hidden dropdown-menu group-hover:block right-0 pt-4'>
                        <div className='flex flex-col gap-2 w-36 bg-slate-100 py-3 px-5 text-sm text-gray-500 cursor-pointer rounded'>
                            <p className='hover:text-black cursor-pointer'>My Profile</p>
                            <p onClick={() => { navigate("/orders") }} className='hover:text-black cursor-pointer'>Orders</p>
                            <p onClick={logoutHandler} className='hover:text-black cursor-pointer'>Logout</p>
                        </div>
                    </div>}
                </div>
                <Link to='/cart' className='relative'>
                    <img src={assets.cart_icon} className='w-5 min-w-5 cursor-pointer' alt="" />
                    <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white text-[8px] rounded-full'>{getCartCount()}</p>
                </Link>
                <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" />
            </div>

            {/* Sidebar menu for small screens */}
            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
                <div className='flex flex-col text-gray-600'>
                    <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                        <img src={assets.dropdown_icon} className='h-4 rotate-180' alt="" />
                        <p>Back</p>
                    </div>
                    <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/">HOME</NavLink>
                    <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/collection">COLLECTIONS</NavLink>
                    <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/about">ABOUT</NavLink>
                    <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/contacts">CONTACT</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Navbar