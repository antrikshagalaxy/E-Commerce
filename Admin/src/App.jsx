import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Add from './Pages/Add'
import List from './Pages/List'
import Orders from './Pages/Orders'
import Navbar from './Components/Navbar'
import Sidebar from './Components/Sidebar'
import Login from './Components/Login'
import { ToastContainer, toast } from 'react-toastify';

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = '₹';


const App = () => {

  const [token, setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : "");

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token])


  return (
    <div className='bg-gray-50 min-h-screen '>
      <ToastContainer />
      {token === "" ? <Login setToken={setToken} /> : (
        <>
          <Navbar setToken={setToken} />
          <hr />
          <div className='flex w-full'>
            <Sidebar />
            <div className='flex-1 p-4 sm:p-8 text-gray-600 text-base max-w-[1200px]'>
              <Routes>
                <Route path='/add' element={<Add token={token} />} />
                <Route path='/list' element={<List token={token} />} />
                <Route path='/orders' element={<Orders token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  )
}


export default App