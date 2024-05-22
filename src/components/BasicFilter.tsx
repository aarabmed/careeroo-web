import React ,{Fragment, useEffect, useState}from 'react'
import { DocumentCheckIcon, EyeSlashIcon,HeartIcon, CheckIcon ,GlobeAltIcon,ChevronUpDownIcon} from '@heroicons/react/20/solid'
import { Dialog,Listbox, Transition } from '@headlessui/react'
import axios from "axios";
import {useRouter} from "next/navigation";

import qs from 'qs'
import Select from "react-tailwindcss-select";
import { useDispatch } from 'react-redux';
import { getCategories } from '@/services/category';
import { setFilter, useFilter } from '@/lib/store';

const axiosInstance = axios.create({
    paramsSerializer: {
      serialize: qs.stringify, // (params) => qs.stringify(params, { arrayFormat: "brackets" }),
      encode: qs.parse,
    },
    validateStatus: function (status) {
      return true;
    },
});




export function BasicFilter({isOpen,closeModal}:{isOpen:boolean,closeModal:any}) {
    const getFilter = useFilter()
    const [categories, setCategoriesData] = useState([])
    const [subcategories, setSubCategoriesData] = useState([])
    const [category, setSelectedِCategory] = useState({id:'000000000',title:'Any',code:'any'})
    const [subCategory, setSelectedِSubCategory] = useState({id:'000000001',title:'Any',code:'any'})
    const [jobType, setSelectedِJobType] = useState({id:'000000002',name:'Any',value:'any'})
    const [WorkPeriod, setSelectedِWorkPeriod ] = useState({id:'000000003',name:'Any',value:'any'})
    const [WorkRegime, setSelectedِWorkRegime] = useState({id:'000000004',name:'Any',value:'any'})
    const [Language, setSelectedِLanguage] = useState({id:'000000005',name:'Any',value:'any'})
    const [Experience, setSelectedِExperience] = useState({id:'000000006',name:'Any',value:'any'})
    const [Benifits, setSelectedِBenifits] = useState(null)

    const dispatch = useDispatch()
    const router  = useRouter()
    const JobTypeList = [
        {
            id: 1,
            name: 'Student',
            value: 'st'
        },
        {
            id: 2,
            name: 'Apprentice',
            value:'in'
        },
        {
            id: 3,
            name: 'Green jobs',
            value:'gr'
        },
        {
            id: 4,
            name: 'Other',
            value:'ot'
        },
        {
            id: 5,
            name: 'Any',
            value:'any'
        },
    ]

    console.log('isOpen:',isOpen)
    const JobRegimeList = [
        {
            id: 1,
            name: 'Full Time',
            value: 'ft'
        },
        {
            id: 2,
            name: 'Part Time',
            value:'pt'
        },
        {
            id: 3,
            name: 'Any',
            value:'any'
        },
    ]

    const ContractList = [
        {
            id: 1,
            name: 'Term or Contract',
            value: 'te'
        },
        {
            id: 2,
            name: 'Permanant',
            value:'pe'
        },
        {
            id: 3,
            name: 'Seasonal',
            value:'se'
        },
        {
            id:4,
            name: 'Any',
            value:'any'
        },
    ]

    const LanguageList = [
        {
            id: 1,
            name: 'English',
            value: 'en'
        },
        {
            id: 2,
            name: 'French',
            value:'fr'
        },
        {
            id: 3,
            name: 'Bilingue',
            value:'be'
        },
        {
            id: 4,
            name: 'Any',
            value:'any'
        }
    ]

    const ExperienceList = [
        {
            id: 1,
            name: 'No experience',
            value: '0'
        },
        {
            id: 2,
            name: 'less than 1 year',
            value:'1'
        },
        {
            id: 3,
            name: '1 Year to less than 3 years',
            value:'2'
        },
        {
            id: 4,
            name: '3 years or more',
            value:'3'
        },
        {
            id: 5,
            name: 'Any',
            value:'any'
        },
    ]

    const BenifitsList = [
        { label: "Health benefits", value: "hb" },
        { label: "Long term benefits", value: "lb" },
        { label: "Financial benefits", value: "fb" },
        { label: "Other benefits", value: "ob" },
    ]

    function classNames(...classes:string[]) {
        return classes.filter(Boolean).join(' ')
    }

    
    const fetchCategory =  async ()=>{
        const fetchCategories = await getCategories()
        console.log('fetchCategorie:',fetchCategories)
        setCategoriesData(fetchCategories.categories)
    }
    
    useEffect(()=>{
        fetchCategory()
    },[])

    const onCategoryChange = (value:any)=>{

        console.log('value-cat',value)
        setSelectedِCategory(value)
        //const subs = categories.find(e=>e._id===value).subcategories
        setSubCategoriesData(value.subcategories)
    }


    const submitFilter = ()=>{
        let filter = {}
        if(subCategory.code !== 'any'){
            filter={...filter,sub:subCategory.code}
        }

        if(category.code!=='any'){
            filter={...filter,cat:category.code}
        }

        if(jobType.value!=='any'){
            filter={...filter,jt:jobType.value}
        }
        
        if(WorkPeriod.value !== 'any' ){
            filter={...filter,emt:WorkPeriod.value}
        }


        if(WorkRegime.value!=='any'){
            filter={...filter,wr:WorkRegime.value}
        }

        const languages = ['en','fr','be']
        if(Language.value!=='any' && languages.includes(Language.value)){
            filter={...filter,lg:Language.value}
        }

        if(Experience.value!=='any'){
            filter={...filter,exp:Experience.value}
        }

        

        

        /* const filter = {
            cat:category.value!=='any'?category._id:'any',
            sub:subCategory.value!=='any'?subCategory._id:'any',
            wb:Benifits.map(ben=>ben.value),
            jt:jobType.value,
            wp:WorkPeriod.value,
            wr:WorkRegime.value,
            lg:Language.value,
            exp:Experience.value,
        } */
        console.log('filter:',filter)
        //dispatch(setFilter(filter))
        /* 
        const {pathname,query   } = router
        return router.replace({pathname,query:{...query,...filter}}) */

    }

    const handleBenifitsChange = (value:any) => {
        setSelectedِBenifits(value);
    };

   


    useEffect(()=>{
        console.log('getFilter:',getFilter)

    },[getFilter])


    const updateFilter = ()=>{
        const data = {
            sub: "",
            cat: "",
            jt: "adasd",
            wp: "",
            wr: "aadada",
            lg: "",
            exp: "",
            wb: [],
        };
        dispatch(setFilter(data))
    }


    return (
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
                        <div className="relative flex-col rounded-2xl flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                            <div className=' flex w-full'>    
                                <div className='flex flex-col border m-2 p-2 w-full '>
                                    <div className='flex w-full flex-col  items-left justify-between p-2 '>     
                                        <Listbox value={category} onChange={onCategoryChange}>
                                            {({ open }) => (
                                                <>
                                                    
                                                    <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">Category</Listbox.Label>
                                                    <div className="relative mt-2">
                                                        <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                                                        <span className="flex items-center">
                                                            <span className="ml-3 block truncate">{category.title}</span>
                                                        </span>
                                                        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                                            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                        </span>
                                                        </Listbox.Button>

                                                        <Transition
                                                            show={open}
                                                            as={Fragment}
                                                            leave="transition ease-in duration-100"
                                                            leaveFrom="opacity-100"
                                                            leaveTo="opacity-0"
                                                        >
                                                        <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                            {categories.map((cat:any) => (
                                                            <Listbox.Option
                                                                key={cat._id}
                                                                className={({ active }) =>
                                                                classNames(
                                                                    active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                                                    'relative cursor-default select-none py-2 pl-3 pr-9'
                                                                )
                                                                }
                                                                value={cat}
                                                            >
                                                                {({ selected, active }) => (
                                                                <>
                                                                    <div className="flex items-center">
                                                                        <span
                                                                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                                                        >
                                                                            {cat.title}
                                                                        </span>
                                                                    </div>

                                                                    {selected ? (
                                                                    <span
                                                                        className={classNames(
                                                                        active ? 'text-white' : 'text-indigo-600',
                                                                        'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                        )}
                                                                    >
                                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                    </span>
                                                                    ) : null}
                                                                </>
                                                                )}
                                                            </Listbox.Option>
                                                            ))}
                                                        </Listbox.Options>
                                                        </Transition>
                                                    </div>
                                                </>
                                            )}
                                        </Listbox>
                                        
                                    </div>
                                    {subcategories.length?<div className='flex  w-full  flex-col   items-left justify-between p-2 '>     
                                        <Listbox value={subCategory} onChange={setSelectedِSubCategory}>
                                            {({ open }) => (
                                                <>
                                                    
                                                    <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">Sub-category</Listbox.Label>
                                                    <div className="relative mt-2">
                                                        <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                                                        <span className="flex items-center">
                                                            <span className="ml-3 block truncate">{subCategory.title}</span>
                                                        </span>
                                                        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                                            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                        </span>
                                                        </Listbox.Button>

                                                        <Transition
                                                            show={open}
                                                            as={Fragment}
                                                            leave="transition ease-in duration-100"
                                                            leaveFrom="opacity-100"
                                                            leaveTo="opacity-0"
                                                        >
                                                        <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                            {subcategories.map((cat:any) => (
                                                            <Listbox.Option
                                                                key={cat._id}
                                                                className={({ active }) =>
                                                                classNames(
                                                                    active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                                                    'relative cursor-default select-none py-2 pl-3 pr-9'
                                                                )
                                                                }
                                                                value={cat}
                                                            >
                                                                {({ selected, active }) => (
                                                                <>
                                                                    <div className="flex items-center">
                                                                        <span
                                                                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                                                        >
                                                                            {cat.title}
                                                                        </span>
                                                                    </div>

                                                                    {selected ? (
                                                                    <span
                                                                        className={classNames(
                                                                        active ? 'text-white' : 'text-indigo-600',
                                                                        'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                        )}
                                                                    >
                                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                    </span>
                                                                    ) : null}
                                                                </>
                                                                )}
                                                            </Listbox.Option>
                                                            ))}
                                                        </Listbox.Options>
                                                        </Transition>
                                                    </div>
                                                </>
                                            )}
                                        </Listbox>
                                        
                                    </div>:null}
                                </div>
                            </div>
                            <div className='flex flex-wrap flex-row w-full '>
                                <div className='flex  min-f-input flex-col m-2 border  items-left justify-between p-4 '>     
                                    <Listbox value={jobType} onChange={setSelectedِJobType}>
                                            {({ open }) => (
                                                <> 
                                                    <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">Job Type</Listbox.Label>
                                                    <div className="relative mt-2">
                                                        <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                                                        <span className="flex items-center">
                                                            <span className="ml-3 block truncate">{jobType.name}</span>
                                                        </span>
                                                        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                                            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                        </span>
                                                        </Listbox.Button>

                                                        <Transition
                                                            show={open}
                                                            as={Fragment}
                                                            leave="transition ease-in duration-100"
                                                            leaveFrom="opacity-100"
                                                            leaveTo="opacity-0"
                                                        >
                                                        <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                            {JobTypeList.map((job) => (
                                                            <Listbox.Option
                                                                key={job.id}
                                                                className={({ active }) =>
                                                                classNames(
                                                                    active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                                                    'relative cursor-default select-none py-2 pl-3 pr-9'
                                                                )
                                                                }
                                                                value={job}
                                                            >
                                                                {({ selected, active }) => (
                                                                <>
                                                                    <div className="flex items-center">
                                                                        <span
                                                                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                                                        >
                                                                            {job.name}
                                                                        </span>
                                                                    </div>

                                                                    {selected ? (
                                                                    <span
                                                                        className={classNames(
                                                                        active ? 'text-white' : 'text-indigo-600',
                                                                        'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                        )}
                                                                    >
                                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                    </span>
                                                                    ) : null}
                                                                </>
                                                                )}
                                                            </Listbox.Option>
                                                            ))}
                                                        </Listbox.Options>
                                                        </Transition>
                                                    </div>
                                                </>
                                            )}
                                    </Listbox>
                                </div>
                                <div className='flex  min-f-input flex-col m-2 border  items-left justify-between p-4 '>     
                                    <Listbox value={WorkRegime} onChange={setSelectedِWorkRegime}>
                                        {({ open }) => (
                                            <>  
                                                <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">Regime</Listbox.Label>
                                                <div className="relative mt-2">
                                                    <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                                                    <span className="flex items-center">
                                                        <span className="ml-3 block truncate">{WorkRegime.name}</span>
                                                    </span>
                                                    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                                        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                    </span>
                                                    </Listbox.Button>

                                                    <Transition
                                                        show={open}
                                                        as={Fragment}
                                                        leave="transition ease-in duration-100"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                    >
                                                    <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                        {JobRegimeList.map((job) => (
                                                        <Listbox.Option
                                                            key={job.id}
                                                            className={({ active }) =>
                                                            classNames(
                                                                active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                                                'relative cursor-default select-none py-2 pl-3 pr-9'
                                                            )
                                                            }
                                                            value={job}
                                                        >
                                                            {({ selected, active }) => (
                                                            <>
                                                                <div className="flex items-center">
                                                                    <span
                                                                        className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                                                    >
                                                                        {job.name}
                                                                    </span>
                                                                </div>

                                                                {selected ? (
                                                                <span
                                                                    className={classNames(
                                                                    active ? 'text-white' : 'text-indigo-600',
                                                                    'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                    )}
                                                                >
                                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                </span>
                                                                ) : null}
                                                            </>
                                                            )}
                                                        </Listbox.Option>
                                                        ))}
                                                    </Listbox.Options>
                                                    </Transition>
                                                </div>
                                            </>
                                        )}
                                    </Listbox>
                                </div>
                                <div className='flex  min-f-input flex-col m-2 border  items-left justify-between p-4 '>     
                                    <Listbox value={WorkPeriod} onChange={setSelectedِWorkPeriod}>
                                        {({ open }) => (
                                            <>
                                                
                                                <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">Term & Contract</Listbox.Label>
                                                <div className="relative mt-2">
                                                    <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                                                    <span className="flex items-center">
                                                        <span className="ml-3 block truncate">{WorkPeriod.name}</span>
                                                    </span>
                                                    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                                        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                    </span>
                                                    </Listbox.Button>

                                                    <Transition
                                                        show={open}
                                                        as={Fragment}
                                                        leave="transition ease-in duration-100"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                    >
                                                    <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                        {ContractList.map((cont) => (
                                                        <Listbox.Option
                                                            key={cont.id}
                                                            className={({ active }) =>
                                                            classNames(
                                                                active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                                                'relative cursor-default select-none py-2 pl-3 pr-9'
                                                            )
                                                            }
                                                            value={cont}
                                                        >
                                                            {({ selected, active }) => (
                                                            <>
                                                                <div className="flex items-center">
                                                                    <span
                                                                        className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                                                    >
                                                                        {cont.name}
                                                                    </span>
                                                                </div>

                                                                {selected ? (
                                                                <span
                                                                    className={classNames(
                                                                    active ? 'text-white' : 'text-indigo-600',
                                                                    'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                    )}
                                                                >
                                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                </span>
                                                                ) : null}
                                                            </>
                                                            )}
                                                        </Listbox.Option>
                                                        ))}
                                                    </Listbox.Options>
                                                    </Transition>
                                                </div>
                                            </>
                                        )}
                                    </Listbox>
                                </div>
                                <div className='flex  min-f-input flex-col m-2 border  items-left justify-between p-4 '>     
                                    <Listbox value={Language} onChange={setSelectedِLanguage}>
                                            {({ open }) => (
                                                <>
                                                    
                                                    <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">Language</Listbox.Label>
                                                    <div className="relative mt-2">
                                                        <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                                                        <span className="flex items-center">
                                                            <span className="ml-3 block truncate">{Language.name}</span>
                                                        </span>
                                                        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                                            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                        </span>
                                                        </Listbox.Button>

                                                        <Transition
                                                            show={open}
                                                            as={Fragment}
                                                            leave="transition ease-in duration-100"
                                                            leaveFrom="opacity-100"
                                                            leaveTo="opacity-0"
                                                        >
                                                        <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                            {LanguageList.map((lang) => (
                                                            <Listbox.Option
                                                                key={lang.id}
                                                                className={({ active }) =>
                                                                classNames(
                                                                    active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                                                    'relative cursor-default select-none py-2 pl-3 pr-9'
                                                                )
                                                                }
                                                                value={lang}
                                                            >
                                                                {({ selected, active }) => (
                                                                <>
                                                                    <div className="flex items-center">
                                                                        <span
                                                                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                                                        >
                                                                            {lang.name}
                                                                        </span>
                                                                    </div>

                                                                    {selected ? (
                                                                    <span
                                                                        className={classNames(
                                                                        active ? 'text-white' : 'text-indigo-600',
                                                                        'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                        )}
                                                                    >
                                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                    </span>
                                                                    ) : null}
                                                                </>
                                                                )}
                                                            </Listbox.Option>
                                                            ))}
                                                        </Listbox.Options>
                                                        </Transition>
                                                    </div>
                                                </>
                                            )}
                                    </Listbox>
                                </div>
                                <div className='flex  min-f-input flex-col m-2 border  items-left justify-between p-4 '>     
                                    <Listbox value={Experience} onChange={setSelectedِExperience}>
                                            {({ open }) => (
                                                <>
                                                    
                                                    <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">Experience</Listbox.Label>
                                                    <div className="relative mt-2">
                                                        <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                                                        <span className="flex items-center">
                                                            <span className="ml-3 block truncate">{Experience.name}</span>
                                                        </span>
                                                        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                                            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                        </span>
                                                        </Listbox.Button>

                                                        <Transition
                                                            show={open}
                                                            as={Fragment}
                                                            leave="transition ease-in duration-100"
                                                            leaveFrom="opacity-100"
                                                            leaveTo="opacity-0"
                                                        >
                                                        <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                            {ExperienceList.map((exp) => (
                                                            <Listbox.Option
                                                                key={exp.id}
                                                                className={({ active }) =>
                                                                classNames(
                                                                    active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                                                    'relative cursor-default select-none py-2 pl-3 pr-9'
                                                                )
                                                                }
                                                                value={exp}
                                                            >
                                                                {({ selected, active }) => (
                                                                <>
                                                                    <div className="flex items-center">
                                                                        <span
                                                                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                                                        >
                                                                            {exp.name}
                                                                        </span>
                                                                    </div>

                                                                    {selected ? (
                                                                    <span
                                                                        className={classNames(
                                                                        active ? 'text-white' : 'text-indigo-600',
                                                                        'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                        )}
                                                                    >
                                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                    </span>
                                                                    ) : null}
                                                                </>
                                                                )}
                                                            </Listbox.Option>
                                                            ))}
                                                        </Listbox.Options>
                                                        </Transition>
                                                    </div>
                                                </>
                                            )}
                                    </Listbox>
                                </div>
                                            
                                
                                <div className='mb-11 flex w-full flex-col m-2 border  items-left justify-between p-4 '>
                                    <Select
                                        isMultiple={true}
                                        placeholder='Job Benifits' 
                                        value={Benifits}
                                        onChange={(value)=>handleBenifitsChange(value)}
                                        options={BenifitsList}
                                        primaryColor=''
                                    />
                                </div>
                            </div>
                            <div className='flex mt-5 min-w-48 flex-row self-end justify-between'>
                                <span className="mt-4 sm:ml-3">
                                    <button
                                        type="submit"
                                        onClick={submitFilter}
                                        className=" w-28 justify-center flex rounded-md bg-secondary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Submit
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
                
    )
}


