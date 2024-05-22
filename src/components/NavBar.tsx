'use client'
import React, { useState, useEffect ,Fragment,useRef} from 'react'
import Link from 'next/link';
import { BiLogOut,  } from 'react-icons/bi';

import {  Menu, Transition } from '@headlessui/react'
import { usePathname } from 'next/navigation';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import Image from 'next/image'
import { getNavigation } from './NavDropdown';
import { Elements, getUserNavigation } from './UserMenu';
import DynamicTag from './DynamicIcon';

function classNames(...classes:any) {
    return classes.filter(Boolean).join(' ')
}


type SUB = {
    key:number,name:string, url:string,active:boolean,subs:SUB[],visible?:boolean
}

type DropDown = {
    data:{
        subs:Array<SUB>,
        name:string,
        url:string
    }
}
const DropDown:React.FC<DropDown> = ({data})=>{

    const buttonRef = useRef<HTMLButtonElement>(null)
    const pathname = usePathname();

    const onHover = ()=>{
        buttonRef?.current?.click()
    }
    const onLeaveHover = ()=>{
        buttonRef?.current?.click()
    }

    const isActive =  pathname
    return <Menu as="div" onMouseEnter={onHover} onMouseLeave={onLeaveHover} className="relative text-gray-700 px-3 py-4 mx-4 text-gray-700  font-medium transition-all duration-700 active:translate-y-2 uppercase">
                <div>
                    <Menu.Button ref={buttonRef}  className="relative flex ">
                        <p className={classNames(isActive.split('/').includes(data.url.split('/')[1])?'border-b-[3px] border-cyan-400':'','text-gray-700 mx-4 text-gray-700  font-medium uppercase')}>{data.name}</p>
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="text-sm absolute flex flex-col left-2 z-10 mt-4 w-48 origin-top-left rounded-md bg-white py-1 shadow-lg  focus:outline-none" style={{border:"1px solid #ecebeb82"}}>
                            {data.subs.map(sub=><Menu.Item key={sub.key}>
                                    <Link href={sub.url} className={classNames(isActive===sub.url?"border-b-[3px] border-cyan-400":"","px-0 my-2 text-gray-700  py-1 mx-4 text-gray-700  font-medium transition-all duration-700 active:translate-y-2 uppercase")}>{sub.name}</Link>
                                </Menu.Item>
                            )}
                    </Menu.Items>
                </Transition>
            </Menu>
}


export default function NavBar() {
   
    const [openState, setOpenState] = useState(false)
    const [openJobs, setOpenJobs] = useState(false)

    useEffect(() => {
        //dispatch(setUserData(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null));
    }, [])


    const pathname = usePathname();
    const user:any = null // useSelector(state => state.User.userData)


    const [isOpen, setIsOpen] = useState(false);
    const [navigation,setNavigation] = useState<Array<SUB>>([])
    const [rightNavigation,setRightNavigation] = useState<Array<Elements>>([])

    const [scrolled, isScrolled] = useState(false);


    const useOutsideClick = (callback:Function) => {
        const ref = React.useRef() as React.MutableRefObject<HTMLInputElement>;

        React.useEffect(() => {
            const handleClick = ({target}:MouseEvent) => {
                if (ref.current && !ref.current.contains(target as Node)) {
                    callback();
                }
            };

            document.addEventListener('click', handleClick, true);

            return () => {
                document.removeEventListener('click', handleClick, true);
            };
        }, [callback, ref]);

        return ref;
    };


    useEffect(()=>{
        const fetchNavigation = async ()=>{
            const fetchedNavigation = await getNavigation()
            const fetchUserNavigation = await getUserNavigation()
            setNavigation(fetchedNavigation)
            setRightNavigation(fetchUserNavigation)
        }
        fetchNavigation()
    },[])

    useEffect(() => {
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                isScrolled(true)
            } else {
                isScrolled(false)
            }
        })
        return () => {
            window.removeEventListener('scroll', () => {
                if (window.scrollY > 20) {
                    isScrolled(true)
                } else {
                    isScrolled(false)
                }
            })
        }
    }, [scrolled])


    const handleLogout = async () => {
       // Cookies.remove('token');
        localStorage.removeItem('user')
        //Router.reload();
    }


    


    const handleClickOutside = () => {
        setIsOpen(false);
    };

    const ref = useOutsideClick(handleClickOutside);


    return (
        <>
            <div  className={`w-full ${scrolled ? "bg-white/70" : "bg-white"} relative shadow-[0px_4px_7px_0px_rgba(0,0,0,0.1)]  px-6 h-20 bg-indigo-600 text-white flex items-center justify-between top-0 left-0 z-50`}>
                <div className='px-2 h-full flex items-center justify-center'>
                    <Image width={80} height={80} src="/logo/careeroo.png" alt="logo" />
                    <p className='text-gray-700 uppercase font-semibold tracking-widest text-lg'>Careeroo</p>
                </div>
                <div className='px-2 h-full text-sm hidden items-center justify-center lg:flex'>
                    {navigation.filter(e=>e.visible).map(item=>{
                        const isActive =  pathname === item.url
                        if(item.subs.length){
                            return  <DropDown key={item.key} data={item}/>
                        }
                        return <Link href={item.url} key={item.key} className={classNames(isActive?"border-b-[3px] border-cyan-400 ":""," text-gray-700 px-3 py-3 mx-4 text-gray-700  font-medium transition-all duration-700 active:translate-y-2 uppercase")}>{item.name}</Link>
                    })}
                </div>
                <div className='px-2 h-full hidden items-center justify-center lg:flex ' >
                    {
                        //!rightNavigation
                        [].map((item:any)=>{            
                            return <div  key={item.key}  className='mx-1'><DynamicTag icon={item.icon} url={item.url} /></div>
                        })
                    }

                </div>

                <div className='flex lg:hidden  px-2 py-2 '>
                    <GiHamburgerMenu className='text-4xl' onClick={() => setIsOpen(state => !state)} />
                </div>

                {
                    isOpen && (
                        <div ref={ref} className='flex w-full py-2 animate-fade-in-down  bg-indigo-600 transition-all fade duration-1000 absolute top-20 left-0  items-center justify-center flex-col '>
                            <div className='px-2 h-full flex items-center justify-center flex-col py-2 '>
                                <Link href={'/'} onClick={() => setIsOpen(false)} className="px-3  m-4 text-base font-medium transition-all duration-700 hover:translate-y-2 uppercase" >Home</Link>
                                <button  onClick={() => setOpenJobs(state => !state)} className="px-3  m-4 text-base font-medium transition-all duration-700 hover:translate-y-2 uppercase flex items-center justify-center" >Jobs {openJobs ? <AiFillCaretUp/>  : <AiFillCaretDown />} </button>

                                {
                                    openJobs &&
                                    <>
                                        <Link href={'/frontend/displayJobs'} onClick={() => setIsOpen(false)} className="px-3 m-4 text-base font-medium transition-all duration-700 hover:translate-y-2 uppercase" >View Jobs</Link>
                                        <Link href={'/frontend/postAJob'} onClick={() => setIsOpen(false)} className="px-3 m-4 text-base font-medium transition-all duration-700 hover:translate-y-2 uppercase" >Post Jobs</Link>
                                        <Link href={'/frontend/postedJob'} onClick={() => setIsOpen(false)} className="px-3 m-4 text-base font-medium transition-all duration-700 hover:translate-y-2 uppercase" >Posted Jobs</Link>
                                    </>
                                }
                                <Link href={'/frontend/dashboard'} onClick={() => setIsOpen(false)} className="px-3 m-4 text-base font-medium transition-all duration-700 hover:translate-y-2 uppercase" >Dashboard</Link>
                                <Link href={'/'} onClick={() => setIsOpen(false)} className="px-3 m-4 text-base font-medium transition-all duration-700 hover:translate-y-2 uppercase" >Contact</Link>
                            </div>
                            <div className='px-2 h-full  items-center justify-center flex' >
                                {
                                    user !== null ? (
                                        <>

                                            <BiLogOut onClick={handleLogout} className=' cursor-pointer text-3xl hover:text-red-500 transition-all duration-700' />
                                            <p className='text-lg px-4 font-semibold'>{user?.name}</p>
                                        </>
                                    ) : (
                                        <>
                                            <Link href={'/auth/login'} className='px-4 py-2 border border-white rounded uppercase tracking-widest mx-4   transition-all duration-700 hover:bg-white font-semibold text-base hover:text-indigo-600'>Login</Link>
                                            <Link href={'/auth/register'} className='px-4 py-2 border border-white rounded uppercase tracking-widest mx-4   text-indigo-600 bg-white transition-all duration-700 hover:bg-transparent font-semibold text-base hover:text-white'>REGISTER</Link>
                                        </>
                                    )
                                }

                            </div>
                        </div>
                    )
                }

            </div>
        </>
    )
}
