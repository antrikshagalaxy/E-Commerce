import React, { useContext, useEffect, useState } from 'react'
import Title from '../Components/Title'
import { ShopContext } from '../Context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

    const [currState, setCurrState] = useState('Login');
    const { token, setToken, backendUrl, navigate } = useContext(ShopContext);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            if (currState === "Login") {
                const response = await axios.post(backendUrl + "/api/user/login", { email, password });
                if (response.data.success) {
                    setToken(response.data.token);
                    localStorage.setItem("token", response.data.token);
                } else {
                    toast.error(response.data.message);
                }
            } else {
                const response = await axios.post(backendUrl + "/api/user/register", { name, email, password });
                if (response.data.success) {
                    setToken(response.data.token);
                    localStorage.setItem("token", response.data.token);
                } else {
                    toast.error(response.data.message);
                }
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || error.message);
        }
    }

    useEffect(() => {
        if (token) {
            navigate("/");
        }
    }, [token, navigate]);

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] mt-14 m-auto sm:max-w-96 text-gray-800 gap-4'>
            <div className='inline-flex items-center gap-2 mt-10 mb-2'>
                <p className='prata-regular text-3xl'>{currState}</p>
                <hr className='border-none w-8 h-[1.5px] bg-gray-800' />
            </div>
            {currState === 'SignUp' && <input value={name} onChange={(e) => { setName(e.target.value) }} className='w-full border border-gray-800  py-2 px-3' type="text" placeholder='Name' required />}
            <input value={email} onChange={(e) => { setEmail(e.target.value) }} className='w-full border border-gray-800  py-2 px-3' type="email" placeholder='Email Address' required />
            <input value={password} onChange={(e) => { setPassword(e.target.value) }} className='w-full border border-gray-800  py-2 px-3' type="password" placeholder='Password' required />
            <div className='w-full text-sm flex justify-between mt-[-8px]'>
                <p className='cursor-pointer'>Forget Your password?</p>
                {
                    currState === 'Login'
                        ? <p onClick={() => { setCurrState("SignUp") }} className='cursor-pointer'>Create Account</p>
                        : <p onClick={() => { setCurrState("Login") }} className='cursor-pointer'>Login Here</p>
                }
            </div>
            <div>
                <button type='submit' className='bg-black text-white font-light px-8 py-2 mt-4'>{currState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
            </div>
        </form>
    )
}

export default Login