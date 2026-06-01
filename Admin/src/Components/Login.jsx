import React, { useState } from 'react'
import axios from 'axios';
const backendUrl = import.meta.env.VITE_BACKEND_URL;
import { ToastContainer, toast } from 'react-toastify';


const Login = ({ setToken }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post(backendUrl + '/api/user/adminlogin', { email, password });
            if (response.data.success) {
                setToken(response.data.token);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }



    return (
        <div className='min-h-screen flex items-center justify-center'>
            <div className='bg-white shadow-md rounder-lg px-8 py-6 max-w-md'>
                <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
                <form onSubmit={onSubmitHandler}>
                    <div className='mb-3 min-w-72'>
                        <p className='text-sm font-medium text-gray-700 mb-2' >Email Address</p>
                        <input onChange={(e) => setEmail(e.target.value)} value={email} className='rounded -md w-full px-3 py-2 border border-gray-300 outline-none' type="email" placeholder="your@email.com" required />
                    </div>
                    <div className='mb-3 min-w-72'>
                        <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
                        <input onChange={(e) => setPassword(e.target.value)} value={password} className='rounded -md w-full px-3 py-2 border border-gray-300 outline-none' type="password" placeholder='Password' required />
                    </div>
                    <button className='w-full text-white bg-black hover:bg-gray-700 rounded-md py-2 text-lg cursor-pointer transition-colors' type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login