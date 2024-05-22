import React, { HTMLAttributes, FC } from 'react';
import { BiLogIn  } from 'react-icons/bi';
import { MdNotificationsNone,MdFavoriteBorder  } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import Link from 'next/link';
interface ComponentProps extends HTMLAttributes<HTMLOrSVGElement> {
    icon: string,
    url:string
}

const LogOutOnCLick =(value:string)=>{

    if(value==='logout'){
        console.log('value:',value)
    }
}

const Component: FC<ComponentProps> = ({icon,url}) => {
    switch (icon) {
         
        case 'logout':
            return <BiLogIn onClick={()=>LogOutOnCLick(icon)} className=' cursor-pointer text-3xl text-gray-800 hover:text-red-500 transition-all duration-700' />
        case 'profil':
            return <Link href={url}><CgProfile  className=' cursor-pointer text-3xl text-gray-800 hover:text-red-500 transition-all duration-700' /></Link>
        case 'saved-jobs':
            return <Link href={url}><MdFavoriteBorder  className=' cursor-pointer text-3xl text-gray-800 hover:text-red-500 transition-all duration-700' /></Link>
        case 'notification':
            return <Link href={url}><MdNotificationsNone  className=' cursor-pointer text-3xl text-gray-800 hover:text-red-500 transition-all duration-700' /></Link>
        case 'register':
            return <Link href={url} className='px-4 py-2 border border-white rounded uppercase tracking-widest mx-4 text-gray-700  transition-all duration-700 hover:bg-white font-semibold text-base hover:text-indigo-600'>Register</Link>
        case 'login':
            return <Link href={url} className='px-4 py-2 border border-white rounded uppercase tracking-widest mx-4 text-gray-700  transition-all duration-700 hover:bg-white font-semibold text-base hover:text-indigo-600'>Login</Link>
                    
        default:
            break;
    }
};

export default Component;
