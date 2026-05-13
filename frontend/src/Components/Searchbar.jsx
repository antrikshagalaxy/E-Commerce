import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const Searchbar = () => {

    const { search, setSearch, showsearch, setShowsearch } = useContext(ShopContext);
    const location = useLocation();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (location.pathname == "/collection") {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [location])



    return showsearch && visible ? (
        <div className='border-b border-t bg-gray-50 text-center'>
            <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
                <input value={search} onChange={(e) => { setSearch(e.target.value) }} type="text" placeholder='Search' className='flex-1 outline-none bg-inherit text-sm' />
                <img className='w-4 ml-2 cursor-pointer' src={assets.search_icon} alt="" />
            </div>
            <img className='inline w-3 cursor-pointer' onClick={() => { setShowsearch(false) }} src={assets.cross_icon} alt="" />
        </div>
    ) : null
}

export default Searchbar