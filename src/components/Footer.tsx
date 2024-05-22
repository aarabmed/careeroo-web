import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import GooglePlay from "public/svg/google-play.svg";
import Image from 'next/image';
import { SocialIcon } from 'react-social-icons'

export default function Footer() {
    


    return (
        <div className='w-full'>
            <div className='w-full  py-4 flex flex-column footer text-white items-start '>
                <div className="w-1/3 p-4 flex justify-center items-center flex-col ">
                    <div className="w-36 flex flex-col items-start">
                        <h4 className='mx-4 py-1 my-2 '>Job Seeker</h4>
                        <Link href="/jobs" className="px-0 my-2  py-1 mx-4 text-gray-400 font-medium transition-all duration-700 active:translate-y-2 ">Jobs</Link> 
                        <Link href="/guide/jobs" className="px-0 my-2  py-1 mx-4 text-gray-400 font-medium transition-all duration-700 active:translate-y-2 ">Interviewing</Link>
                        <Link href="/guide/find-job" className="px-0 my-2  py-1 mx-4 text-gray-400 font-medium transition-all duration-700 active:translate-y-2 ">Find Job</Link>     
                        <Link href="/guide/resumes" className="px-0 my-2  py-1 mx-4 text-gray-400 font-medium transition-all duration-700 active:translate-y-2 ">Resumes</Link>     
                        <Link href="/guide/cover-letter" className="px-0 my-2  py-1 mx-4 text-gray-400 font-medium transition-all duration-700 active:translate-y-2 ">Cover letter</Link>     
                        <Link href="/guide/resignation" className="px-0 my-2  py-1 mx-4 text-gray-400 font-medium transition-all duration-700 active:translate-y-2 ">Resignation</Link>
                    </div>
                </div>

                <div className="w-1/3 p-4 flex justify-center items-center flex-col">
                    <div className="w-52 flex flex-col  items-start">
                        <h4 className='mx-4 py-1 my-2 '>Careeroo</h4>
                        <Link href="/legal/privacy-policy" className="px-0 my-2  py-1 mx-4 text-gray-400 font-medium transition-all duration-700 active:translate-y-2 ">Privacy policy</Link>
                        <Link href="/legal/terms-and-conditions" className="px-0 my-2  py-1 mx-4 text-gray-400 font-medium transition-all duration-700 active:translate-y-2 ">Terms & conditions</Link>     
                        <Link href="/legal/cookies" className="px-0 my-2  py-1 mx-4 text-gray-400 font-medium transition-all duration-700 active:translate-y-2 ">Cookies</Link>     
                        <Link href="/contact-us" className="px-0 my-2  py-1 mx-4 text-gray-400 font-medium transition-all duration-700 active:translate-y-2 ">Contact-Us</Link>
                    </div>
     
                </div>
                
                <div className="w-1/3 p-4 flex justify-center items-center flex-col">
                    
                    <h4 className='mx-4 py-1 my-2 '>Mobile App:</h4>
                    <Link href="https://play.google.com/store/apps/details?id=com.careeroo.mobile" className="px-0 my-2  py-1 mx-4 text-gray-400 font-medium transition-all duration-700 active:translate-y-2 "><Image priority src={GooglePlay} alt='google careeroo search jobs app' height={60}/></Link> 
                    <h4 className='mt-6 py-1 my-2'>Find us on Social Media:</h4>
                    <div className=''>
                        <SocialIcon network='instagram' url="" style={{margin:'8px'}}/>
                        <SocialIcon network='x' url="" style={{margin:'8px'}}/>
                        <SocialIcon network='facebook' url="" style={{margin:'8px'}} />
                    </div>
                </div>
            </div>
            <div className="footer-cr text-cyan-700 p-2 text-center">
                <p>© Careeroo. All rights reserved.</p>
            </div>
        </div>
    )
}



  
