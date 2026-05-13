import React from 'react'
import { Routes, Route } from 'react-router-dom'
import PlaceOrder from './Pages/PlaceOrder'
import Home from './Pages/Home'
import Product from './Pages/Product'
import Cart from './Pages/Cart'
import Login from './Pages/Login'
import Orders from './Pages/Orders'
import About from './Pages/About'
import Contacts from './Pages/Contacts'
import Collection from './Pages/Collection'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Searchbar from './Components/Searchbar'

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <Navbar />
      <Searchbar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/product/:productId' element={<Product />}></Route>
        <Route path='/cart' element={<Cart />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/placeorder' element={<PlaceOrder />}></Route>
        <Route path='/orders' element={<Orders />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/contacts' element={<Contacts />}></Route>
        <Route path='/collection' element={<Collection />}></Route>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
