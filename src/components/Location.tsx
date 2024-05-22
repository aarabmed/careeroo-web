/* eslint-disable react-hooks/exhaustive-deps */
import React ,{Fragment, useEffect, useState}from 'react'
import { Dialog,Listbox, Transition } from '@headlessui/react'
import { Modal } from "react-responsive-modal";
import axios from "axios";
import { ProvinceList } from '@/lib/staticData';

import qs from 'qs'
import Select from "react-tailwindcss-select";
import { getCitiesByProvince } from '@/services/city';

const axiosInstance = axios.create({
    paramsSerializer: {
      serialize: qs.stringify, // (params) => qs.stringify(params, { arrayFormat: "brackets" }),
      encode: qs.parse,
    },
    validateStatus: function (status) {
      return true;
    },
});


const ProvinceInit ={
    id: 0,
    label: '',
    value: ''
}

type CityType = {
    id: string,
    label: string,
    value: string
}

export default function Index({isOpen,closeModal,getLocation}:{isOpen: any,closeModal: any,getLocation: any}) {
    const [Province, setProvince] = useState(ProvinceInit)
    const [CitiesList, setCities] = useState<Array<CityType>>([])
    const [City, setCity] = useState<any>(null)


    const selectLocation = (value:any)=>{
        setCity(value);
    }


    const selectProvince = (value:any) => {
        if(City){
            setCity(null)
        }
        setProvince(value);
    };


    const getCities = async () => {

        const {success,cities} = await getCitiesByProvince(Province.value)
        if(success && cities?.length){
            setCities([...cities.map(e=>({id:e._id,label:e.name,value:e.name}))])
        }
       
    };

    const onSubmitLocation = async ()=>{
        if(Province){
            const loc = City?`${City.value}-${Province.value.toUpperCase()}`:Province.label
            getLocation(loc)
            closeModal()
        }
    }

    useEffect(()=>{
        if(Province.id!==0){
            getCities()
        }
    },[Province])

    return (
        <div className='flex items-center h-full justify-center z-50'>
            <Transition.Root show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10"  onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        >
                    <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
                    </Transition.Child>
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                                enterTo="opacity-100 translate-y-0 md:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 md:scale-100"
                                leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                            >
                            <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                                <div className="relative flex-col rounded-2xl flex w-full h-72 items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                        
                                    <div className='flex  flex-row w-full '>
                                        <div className='slc-class  mb-11 flex w-full flex-col m-2 border  items-left justify-between p-4 '>     
                                            <Select
                                                    classNames={{list:'max-h-40 overflow-y-auto'}}
                                                    placeholder='Province and teritories' 
                                                    value={Province.id?Province:null}
                                                    onChange={(value)=>selectProvince(value)}
                                                    options={ProvinceList}
                                                    primaryColor=''

                                                />
                                        </div>    
                                        <div className='slc-class mb-11 flex w-full flex-col m-2 border  items-left justify-between p-4 '>
                                            <Select
                                                classNames={{
                                                    list:'max-h-32 overflow-y-auto',
                                                    searchContainer:'relative py-1 px-2.5 flex items-center',
                                                    searchIcon:'absolute w-5 h-5 mt-2.5 pb-0.5 ml-2 text-gray-500 m-2',
                                                    searchBox:'w-full py-2 pl-8 text-sm text-gray-500 bg-gray-100 border border-gray-200 rounded focus:border-gray-200 focus:ring-0 focus:outline-none'}}
                                                isSearchable={true}
                                                placeholder='Place (city,village...)' 
                                                value={City}
                                                onChange={(value)=>selectLocation(value)}
                                                options={CitiesList}
                                                primaryColor=''
                                            
                                            />
                                        </div>
                                    </div>
                                    <div className='flex mt-10 min-w-48 flex-row self-end justify-between'>
                                        <span className="mt-4 sm:ml-3">
                                            <button
                                                type="submit"
                                                onClick={onSubmitLocation}
                                                className=" w-36 justify-center flex rounded-md bg-secondary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            >
                                                Submit Location
                                            </button>
                                        </span>
                                        <span className="mt-4 sm:ml-3">
                                            <button
                                                type="submit"
                                                onClick={closeModal}
                                                className="w-28 justify-center  flex rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                >
                                                Cancel
                                            </button>
                                        </span>
                                    </div>
                                    
                                    
                                </div>
                            </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </div>
    )
}
