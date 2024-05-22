'use client'
import NavBar from '@/components/NavBar'
import NotFoundSVG from 'public/svg/not-found.svg'
import Image from 'next/image'
 
export default function NotFound() {
  return <>
       {/*  <NavBar /> */}
            <div className='w-full h-screen bg-gray-200'>
                <div className="flex flex-col items-center  text-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                    <div className='max-w-5xl text-gray-500 not-found p-4 bg-white flex items-center justify-center flex-col'>
                        <Image priority src={NotFoundSVG} className="mb-6" alt='not found' height={200}/>
                        <h2 className='uppercase font-bold'>Page Not Found</h2>
                        <p className='uppercase'>Could not find requested resource</p>
                    </div>
                </div>
            </div>     
    </>
}