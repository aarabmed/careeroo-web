'use client'

import React, { FormEvent, FormEventHandler, useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import Router from 'next/router';
import { authentication } from '@/services/auth';
import { useDispatch } from 'react-redux';
//import { setUserData } from '@/Utils/UserReducer';
import NavBar from '@/components/NavBar';
import Image from 'next/image';
import axios from "axios";
import qs from 'qs'

const axiosInstance = axios.create({
  paramsSerializer: {
    serialize: qs.stringify, // (params) => qs.stringify(params, { arrayFormat: "brackets" }),
    encode: qs.parse,
  },
  validateStatus: function (status) {
    return true;
  },
});

export default function Login() {
  //const dispatch = useDispatch()


  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState({ email: "", password: "" });

  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    if (!formData.email) {
      setError({ ...error, email: "Email Field is Required" })
      return;
    }
    if (!formData.password) {
      setError({ ...error, password: "Password Field is required" })
      return;
    }

    /* const res = await login_me(formData);
    if(res.success)
    {
      localStorage.setItem('user', JSON.stringify(res?.finalData?.user));
      dispatch(setUserData(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null));
      Router.push('/');
    }
    else
    {
      toast.error(res.message);
    } */
  }


  function navigate(url:string){
    window.location.href = url;
  }

  const Auth= async ()=>{
      const {success,url} = await authentication()
      if(success){
        navigate(url);
      }
  }


  return (
    <>
    <div className='w-full h-screen bg-indigo-600'>
      <div className="flex flex-col items-center  text-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        
        <div className="w-full bg-white text-black rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Sign in to your account
            </h1>
            <div className='w-full my-2'>
                  <button onClick={()=>Auth()} className="px-4 py-4 border w-full text-slate-800 justify-center flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg  dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
                    <Image fill={true} className="w-6 google-logo h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
                    <span className=''>Login with Google</span>
                  </button>   
                  {/* <GoogleLogin
                    o
                    onSuccess={credentialResponse =>console.log('res:',credentialResponse )}
                    onError={console.log('error')}
                  /> */}         
            </div>

            <h5 className='text-center font-bold'>Or Log In With Email</h5>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
              <div className='text-left'>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                <input onChange={(e) => setFormData({ ...formData, email: e.target.value })} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 " placeholder="name@company.com" required={true} />
                {
                  error.email && <p className="text-sm text-red-500">{error.email}</p>
                }
              </div>
              <div className='text-left'>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                <input onChange={(e) => setFormData({ ...formData, password: e.target.value })} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5" required={true} />
                {
                  error.password && <p className="text-sm text-red-500">{error.password}</p>
                }
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-indigo-300   dark:focus:ring-indigo-600 " required={true} />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                  </div>
                </div>
                <Link href="/auth/forget-password" className="text-sm font-medium text-indigo-600 hover:underline ">Forgot password?</Link>
              </div>
              <button type="submit" className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">Sign in</button>
              <p className="text-sm font-light ">
                Don’t have an account yet? <Link href="/auth/register" className="font-medium text-indigo-600 hover:underline ">Sign up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
    </>
  )
}




