import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useState } from 'react'
import { assets } from '../assets/assets'
import Title from '../Components/Title'
import ProductItem from '../Components/ProductItem'
import { useEffect } from 'react'

const Collection = () => {

    const { products, search, showsearch } = useContext(ShopContext);
    const [showfilter, Setshowfilter] = useState(false);
    const [filterproducts, setfilterproducts] = useState([]);
    const [Category, setCategory] = useState([]);
    const [SubCategory, setSubCategory] = useState([]);
    const [sortType, setSortType] = useState('relevant');

    const togglecategory = (e) => {
        if (Category.includes(e.target.value)) {
            setCategory(Category.filter(item => item !== e.target.value));
        } else {
            setCategory([...Category, e.target.value]);
        }
    }

    const toggleSubCategory = (e) => {
        if (SubCategory.includes(e.target.value)) {
            setSubCategory(SubCategory.filter(item => item !== e.target.value));
        } else {
            setSubCategory([...SubCategory, e.target.value]);
        }
    }

    const sortProduct = (productsList) => {
        switch (sortType) {
            case 'low-high':
                return productsList.sort((a, b) => a.price - b.price);
            case 'high-low':
                return productsList.sort((a, b) => b.price - a.price);
            default:
                return productsList;
        }
    }

    const applyFilter = () => {
        let productsCopy = products.slice();

        if (showsearch && search.length > 0) {
            productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()) || item.description.toLowerCase().includes(search.toLowerCase()));
        }

        if (Category.length > 0) {
            productsCopy = productsCopy.filter(item => Category.includes(item.category));
        }

        if (SubCategory.length > 0) {
            productsCopy = productsCopy.filter(item => SubCategory.includes(item.subCategory || item.subcategory));
        }

        setfilterproducts(sortProduct(productsCopy));
    }

    useEffect(() => {
        setfilterproducts(products);
    }, [])

    useEffect(() => {
        applyFilter();
    }, [Category, SubCategory, sortType, search, showsearch, products]);

    return (
        <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
            {/*Filter Option*/}
            <div className='min-w-60'>
                <p onClick={() => Setshowfilter(!showfilter)} className='text-xl flex items-center cursor-pointer gap-2 my-2'>FILTER
                    <img className={`h-3 sm:hidden ${showfilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
                </p>
                {/*Category Options */}
                <div className={`border border-gray-300 pl-5 mt-6 py-3 ${showfilter ? '' : 'hidden'} sm:block`}>
                    <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
                    <div className='flex flex-col gap-2 text-gray-700 font-light'>
                        <div className='flex items-center gap-3'>
                            <input className='w-4 h-4' type="checkbox" value='Men' onChange={togglecategory} />
                            <p className='prata-regular'>Men</p>
                        </div>
                        <div className='flex items-center gap-3'>
                            <input className='w-4 h-4' type="checkbox" value='Women' onChange={togglecategory} />
                            <p className='prata-regular'>Women</p>
                        </div>
                        <div className='flex items-center gap-3'>
                            <input className='w-4 h-4' type="checkbox" value='Kids' onChange={togglecategory} />
                            <p className='prata-regular'>Kids</p>
                        </div>
                    </div>
                </div>
                <div className={`border border-gray-300 pl-5 my-5 py-3 ${showfilter ? '' : 'hidden'} sm:block`}>
                    <p className='mb-3 text-sm font-medium'>TYPE</p>
                    <div className='flex flex-col gap-2 text-gray-700 font-light'>
                        <div className='flex items-center gap-3'>
                            <input className='w-4 h-4' type="checkbox" value='Topwear' onChange={toggleSubCategory} />
                            <p className='prata-regular'>Topwear</p>
                        </div>
                        <div className='flex items-center gap-3'>
                            <input className='w-4 h-4' type="checkbox" value='Bottomwear' onChange={toggleSubCategory} />
                            <p className='prata-regular'>Bottomwear</p>
                        </div>
                        <div className='flex items-center gap-3'>
                            <input className='w-4 h-4' type="checkbox" value='Winterwear' onChange={toggleSubCategory} />
                            <p className='prata-regular'>Winterwear</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side */}
            <div className='flex-1'>
                <div className='flex flex-wrap justify-between items-center text-base sm:text-2xl mb-4 gap-2'>
                    <Title text1='ALL ' text2='COLLECTIONS' />
                    <select onChange={(e) => setSortType(e.target.value)} className='border border-gray-300 text-xs sm:text-sm px-2 py-1 sm:py-2 max-w-[150px] sm:max-w-none'>
                        <option value="relevant">Sort by : Relevant</option>
                        <option value="low-high">Sort by : Low-High</option>
                        <option value="high-low">Sort by : High-Low</option>
                    </select>
                </div>
                {/* Map Products */}
                <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-6'>
                    {
                        filterproducts.map((item, index) => {
                            return <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />

                        })
                    }
                </div>
            </div>

        </div>
    )
}

export default Collection