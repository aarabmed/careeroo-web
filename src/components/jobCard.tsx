
import React from 'react'
import Image from 'next/image'
import { BsDot } from 'react-icons/bs'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { useRouter } from 'next/navigation'
import moment from 'moment';


const mock = {
    _id: "65a7e229d5915d0961c51e39",
    createdAt: "2024-01-17T14:20:24.508072",
    date: "2024-01-17T14:20:24.508072",
    jobSalary: "$18.00 hourly",
    job_id: "article-40042244",
    location: "Anjou (QC)",
    locations: [ "Anjou, QC" ],
    platform: "québecemploi",
    salaryType: "hourly",
    title: "clerk, maintenance service",
    verified: false,
    yearlySalary: []
}

const Location = (loc:string,locs:string[])=>{
    if(loc===''){
      if(locs.length>1){
        return 'Various Locations'
      }else{
        return locs[0]
      }
    }else{
      return loc
    }
}
export default function JobCard({job,reverse,getArticle }:{job:any,reverse:boolean,getArticle:any}) {
    const Capitalize = (str:string)=> str.charAt(0).toUpperCase() + str.slice(1)
    const openArticle = ()=>{
        return getArticle(job._id)
    }
    return (
        <div onClick={openArticle} key={job._id} className={`${reverse?'-scale-x-100':''} w-full bg-white mb-4 cursor-pointer  transition-all duration-1000 border hover:shadow-xl rounded px-4 md:flex md:flex-wrap`}>
            <div className='flex flex-col w-full items-left justify-start pt-2 '>
{/*                 <Image width={70} height={70} className="flex rounded-full " src={"https://xsgames.co/randomusers/avatar.php?g=male"} alt="no image" />
 */}            <div className='flex flex-col mx-2 px-2'>
                    <h1 className='text-xl md:text-2xl cardTitle font-semibold'>{Capitalize(job.title)}</h1>
                </div>
                <div className='flex flex-col md:flex-wrap md:flex-row w-full justify-between  items-center '>
                    <div className='flex  items-start justify-center py-2 mx-2 flex-col'>
                        <div className='flex px-6 rounded-2xl py-1 items-center justify-center business text-indigo-900  '>
                            <p className='text-xs sm:text-sm md:text-base text-gray-800'>at <span className='font-semibold'>{job?.business}</span></p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mb-1 pb-1 flex items-start justify-center flex-col'>
                <div className='flex px-4  items-center justify-center '>
                    <div className='flex flex-row items-center'>
                        <BsDot className='text-4xl m font-extrabold text-indigo-600 mr-1 dotCalss'  />
                        <h1 className='text-lg text-gray-900 mr-1'>Salary :</h1>
                    </div>
                    <div className='my-2'>
                        <p className='text-base  font-semibold'> {job?.jobSalary?job.jobSalary:'Non disponible'}</p>
                    </div>
                </div>
                <div className='flex px-4  items-center  justify-center'>
                    <div className='flex flex-row items-center'>
                        <BsDot className='text-4xl font-extrabold text-indigo-600 mr-1 dotCalss'/>
                        <h1 className='text-lg text-gray-900 mr-1'>Published :</h1>
                    </div>
                    <div>
                        <p className='text-base  font-semibold'>{moment(job.date).fromNow()}</p>
                    </div>
                </div>
            </div>
            
        </div>
    )
}


