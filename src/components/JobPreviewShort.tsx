
import React from 'react'

import { MapPinIcon, ArrowTopRightOnSquareIcon} from '@heroicons/react/24/outline'
import { EyeSlashIcon,HeartIcon ,GlobeAltIcon} from '@heroicons/react/20/solid'



const Location = (loc: string, locs: string[]) => {
    if (loc === '') {
      if (locs.length > 1) {
        return 'Various Locations'
      } else {
        return locs[0]
      }
    }else{
      return loc
    }
}




export default function JobsPreviewShort({data}:any) {
    function classNames(...classes:any[]) {
        return classes.filter(Boolean).join(' ')
    }
    const Capitalize = (str:string)=> str.charAt(0).toUpperCase() + str.slice(1)
    return (
            <div key={data._id} className='w-full h-full m-4 bg-white flex flex-col justify-between mb-4 cursor-pointer  transition-all duration-1000 border hover:shadow-xl rounded  md:flex md:flex-wrap'>
                    <div className='flex h-1/3 flex-col m-2 border  items-left justify-between p-4 '>
                        <div className='flex flex-col'>
                            <div className='mx-2 px-2'>
                                <h1 className='text-xl md:text-2xl cardTitle font-semibold'>{Capitalize(data.title)}</h1>
                            </div>
                            <div className='flex flex-row'>
                                <div className=' w-1/2 flex flex-col mx-2 px-2'>
                                    {data.organization && data.organization.hasLink?<span className='underline underline-offset-4 mb-1'><a href={data.organization.link} className='w-fit flex items-center text-blue-600 hover:text-blue-400'>                                            
                                        <GlobeAltIcon className="mt-1 -ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                                        {data.organization.title}
                                    </a></span>:null}
                                    <div className='flex flex-row mb-1 '><MapPinIcon className="mt-1 -ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" /><h2 >{data.address?data.address:Location(data.location,data.locations)}</h2></div>
                                    <div className='flex flex-row items-center'>
                                        <h2 className='font-bold uppercase' >{data.jobSalary}</h2>
                                    </div>
                                    {data.regime?<div className='flex flex-row items-center'>
                                        <h2 className='font-semibold text-lg fon text-gray-900 mr-5'>{data.regime} Job</h2>
                                    </div>:null}
                                </div>
                                <div className='flex w-1/2  px-4 flex-col items-start  justify-center'>
                                    {/* data.startAt */true?<div className='flex flex-row items-center'>
                                        <h2 className='font-semibold text-lg text-gray-900 mr-5'>Started:</h2>
                                        <p> Start as soon possible {/* {data.startAt} */}</p>
                                    </div>:null}
                                    {/* data.vacancy */  true?<div className='flex flex-row items-center'>
                                        <h2 className='font-semibold text-lg text-gray-900 mr-5'>Vacancy:</h2>
                                        <p> 1 vacancy {/* {data.vacancy} */}</p>
                                    </div>:null}
                                    
                                </div>
                            </div>
                        </div>
                        
                        
                        <div className='flex flex-col md:flex-wrap md:flex-row w-full justify-end  items-end '>
                            <div className='flex  items-start justify-center py-2 mx-2 flex-row'>
                                <div className="mt-5 flex lg:ml-4 lg:mt-0">
                                    <span className="sm:ml-3">
                                        <button
                                            type="submit"
                                            className="flex rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                            >
                                            <HeartIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                                            Save
                                        </button>
                                    </span>
                                    <span className="sm:ml-3">
                                    
                                        <button
                                            type="submit"
                                            className="flex rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                            >
                                            <EyeSlashIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                                            Ignore
                                        </button>
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className='h-3/5 mb-2 m-2 pb-4 p-2 border pb-1 flex items-center justify-center flex-col'>
                        <div className='flex mt-5 flex-col items-center justify-center'>
                                <p>For more details about this job offer, check out the link bellow</p>
                                <span className="mt-4 sm:ml-3">
                                        <button
                                            type="submit"
                                            className="flex rounded-md bg-secondary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            >
                                            <ArrowTopRightOnSquareIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                                            Full details
                                        </button>
                                </span>
                        </div>
                    </div>
            </div>
    )
}


