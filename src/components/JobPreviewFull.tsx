
import React,{useEffect, useState} from 'react'

import moment from 'moment';
import { MapPinIcon} from '@heroicons/react/24/outline'
import { DocumentCheckIcon, EyeSlashIcon,HeartIcon ,GlobeAltIcon} from '@heroicons/react/20/solid'
import {useCollapse} from "react-collapsed";
import ApplyOptions from "@/components/ApplyOptions"
import ApplyOptionsModal from "@/components/ApplyOptionsModal"

const Location = (loc: string,locs: string | any[])=>{
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


const Skills = ({ data }:{data:any}) => {
    return <div className='flex flex-col w-full pl-4' >
      {data.map((skill:any, i:number) => (
        <div className='flex flex-col text-gray-800 shrink' key={i}>
            <div  className='flex flex-row w-full shrink'>
                <p className='w-1 mr-2'>-</p>
                <p className='flex shrink text-gray-800'>
                  {skill.title}
                </p>
            </div>
            <div  className='pl-4 flex flex-col flex-wrap'>
              {skill.data.map((el: string, k: React.Key | null | undefined) => (
                <div className='flex flex-row items-center' key={k}>
                  <p className='text-gray-600 font-semibold mb-1 mr-2'>↳</p> 
                  <p className='text-gray-600'>{' '+el}</p>
                </div>
              ))}
            </div>
        </div>))}
      </div>
    
  };

function Collapse({ isActive,data}:{isActive:boolean,data:any}) {
    
    const { getToggleProps, getCollapseProps,setExpanded } = useCollapse({easing:'cubic-bezier(0, 0, 0.58, 1.0)'});
    
    useEffect(()=>{
        if(!isActive){
            setTimeout(() => {
                setExpanded(isActive)
            }, 1000);

        }    
    },[isActive, setExpanded])

   

    return (
        <>
        <div className='m-2' {...getCollapseProps({ style: { width: "100%", background:'#dae6d9' , lineHeight:"2.5"} })}>
           <ApplyOptions data={data}/>
        </div>
        </>
    );
}



export default function JobsPreviewFull({data,onMobile}:{data:any, onMobile:boolean}) {
    const [isExpanded, setExpanded] = useState(false);

    const [modelOpen , setModalOpen] = useState(false)

    const closeModal=()=>{
        setModalOpen(false)
    }
   

    const daysUntilExpire = moment(data.expire).diff(moment(),'days')
    function classNames(...classes: string[]) {
        return classes.filter(Boolean).join(' ')
    }

    const onApply = ()=>{
        if(onMobile){
           return setExpanded((x) => !x)
        }else{
            setModalOpen(true)
        }
    }
    const Capitalize = (str:string)=> str.charAt(0).toUpperCase() + str.slice(1)
    return (<>
            <ApplyOptionsModal isOpen={modelOpen} closeModal={closeModal} data={data.instructions} />
            <div key={data._id} className='w-full bg-white  mb-4 cursor-pointer  transition-all duration-1000 border hover:shadow-xl rounded  md:flex md:flex-wrap'>
                    <div className='flex flex-col m-2 border w-full items-left justify-start p-2 '>
                        <div className='flex flex-col mx-2 px-2'>
                            <h1 className='text-xl md:text-2xl cardTitle font-semibold'>{Capitalize(data.title)}</h1>
                            {data.organization.hasLink?<span className='underline underline-offset-4 mb-1'><a href={data.organization.link} className='w-fit flex items-center text-blue-600 hover:text-blue-400'>                                            
                                <GlobeAltIcon className="mt-1 -ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                                {data.organization.title}
                            </a></span>:null}
                            <div className='flex flex-row mb-1 '><MapPinIcon className="mt-1 -ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" /><h2 >{data.address?data.address:Location(data.location,data.locations)}</h2></div>
                            <h2 className='font-bold uppercase ml-1' >{data.jobSalary}</h2>
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
                                    <span className="sm:ml-3">
                                        <button
                                            onClick={onApply}
                                            type="submit"
                                            className="flex rounded-md bg-secondary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            >
                                            <DocumentCheckIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                                            Apply
                                        </button>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Collapse isActive={isExpanded} data={data.instructions}/>
                    <div className={classNames(daysUntilExpire>0?'expire-bg':'expired-bg','flex flex-col m-2 w-full items-left justify-start p-2 ')}>
                        <div className='flex flex-col mx-2 px-2 items-center uppercase'>
                            <p className='text-xl font-semibold'>{daysUntilExpire>0?'This offer expires in '+daysUntilExpire+' day(s)':'Offre Expired'}</p>
                        </div>
                    </div>
                    <div className='mb-2 m-2 pb-4 p-2 border pb-1 flex items-start justify-center flex-col'>
                        <div className='flex px-4 flex-col items-start justify-center p-4'>
                            <div className='flex flex-row items-center'>
                                <h2 className='font-semibold text-lg fon text-gray-900 mr-5'>Job Regime:</h2>
                                <p>{data.regime} {data.workHours? `- ${data.workHours}`:''}</p>
                            </div>
                            {data.startAt?<div className='flex flex-row items-center'>
                                <h2 className='font-semibold text-lg text-gray-900 mr-5'>Started:</h2>
                                <p>{data.startAt}</p>
                            </div>:null}
                            <div className='flex flex-row items-center'>
                                <h2 className='font-semibold text-lg text-gray-900 mr-5'>Contract:</h2>
                                <p>{data.periode}</p>
                            </div>
                            {data.vacancy?<div className='flex flex-row items-center'>
                                <h2 className='font-semibold text-lg text-gray-900 mr-5'>Vacancy:</h2>
                                <p>{data.vacancy}</p>
                            </div>:null}
                        </div>
                        <div className='flex px-4 flex-col items-center  justify-center'>
                            {data.target==="national"?<div className='flex flex-col w-full mb-6 warning-yl p-4 rounded-md '>
                                <p className='text-xs' >You are eligible to apply for this job if:</p>
                                <div className='flex flex-row pl-3'>
                                    <p className='text-xs' >-</p>
                                    <p className='text-xs ml-1.5'>You are a Canadian citizen, a permanent or a temporary resident of Canada.</p>
                                </div>
                                <div className='flex flex-row pl-3'>
                                    <p className='text-xs' >-</p>
                                    <p className='text-xs ml-1.5'>You have a valid Canadian work permit.</p>
                                </div>
                            </div>:<div className='flex flex-col w-full mb-6 warning-gr p-4 rounded-md '>
                                <p className='text-xs' >All applications are accepted::</p>
                                <div className='flex flex-row pl-3'>
                                    <p className='text-xs' >-</p>
                                    <p className='text-xs ml-1.5'>Canadian citizens and permanent or temporary residents of Canada.</p>
                                </div>
                                <div className='flex flex-row pl-3'>
                                    <p className='text-xs' >-</p>
                                    <p className='text-xs ml-1.5'>Candidates with or without a valid Canadian work permit.</p>
                                </div>
                            </div>}
                            <div className='flex flex-col w-full  mb-3'>
                                <p
                                    className='w-1/2 text-left mr-2 font-bold uppercase text-color-primary'
                                >
                                    Educations:
                                </p>
                                <div className='ml-4 flex flex-col w-full'>
                                    {data.education.map((ed:any, i:number) => (
                                        <div key={i} className='flex flex-row w-full'>
                                            <p className='w-1 mr-2 text-gray-800'>-</p>
                                            <p className='flex flex-wrap text-gray-800'>
                                                {ed}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className='flex flex-col w-full  mb-3'>
                                <p
                                className='w-1/2 text-left mr-2 font-bold uppercase text-color-primary'
                                >
                                    Language:
                                </p>
                                <div className='ml-4 flex w-full flex-wrap'>
                                    <p className='text-gray-900' >{data.languages.language}</p>
                                </div>
                            </div>
                            <div className='flex flex-col w-full  mb-3'>
                                <p
                                    className='w-1/2 text-left mr-2 font-bold uppercase text-color-primary'
                                >
                                Experience:
                                </p>
                                <div className='ml-4 flex flex-row w-full' >
                                    <p className='w-1 mr-2 text-gray-800'>-</p>
                                    <p className='flex flex-wrap shrink text-gray-800' >{data.experience.value}</p>
                                </div>
                            </div>
                            {data.specialization.length?<div className='flex flex-col w-full  mb-3'>
                                <p
                                    className='w-full text-left mr-2 font-bold uppercase text-color-primary'
                                >
                                Skills and Specialities:
                                </p>
                                <Skills data={data.specialization} />
                            </div>:null}
                        </div>
                        <div className='flex px-4 flex-col items-center  justify-center'>
                            <div className='flex flex-col w-full  mb-3'>
                                <p
                                    className='w-1/2 text-left mr-2 font-bold uppercase text-color-primary'
                                >
                                    Responsibilities:
                                </p>
                                <div className='ml-4 flex flex-col w-full'>
                                    <p className='font-bold'>Tasks</p>
                                    {data.responsibilities.tasks.length?data.responsibilities.tasks.map((ed:any, i:number) => (
                                        <div key={i} className='flex flex-row w-full'>
                                            <p className='w-1 mr-2 text-gray-800'>-</p>
                                            <p className='flex flex-wrap text-gray-800'>
                                                {ed}
                                            </p>
                                        </div>
                                        )):<p className='text-gray-800'>---------</p>}
                                    <p className='font-bold mt-3'>Supervision</p>
                                    {data.responsibilities.supervision.length?data.responsibilities.supervision.map((ed:any, i:number) => (
                                        <div key={i} className='flex flex-row w-full'>
                                            <p className='w-1 mr-2 text-gray-800'>-</p>
                                            <p className='flex flex-wrap text-gray-800'>
                                                {ed}
                                            </p>
                                        </div>
                                    )):<p className='text-gray-800'>---------</p>}
                                </div>
                            </div>
                            {data.commitments.commitsString?<div className='flex flex-col w-full  mb-3'>
                                    <p
                                        className='w-1/2 text-left mr-2 font-bold uppercase text-color-primary'
                                    >
                                        Commitment:
                                    </p>
                                    <div className='ml-4 flex flex-col w-full'>
                                        <p className='text-gray-800'>{data.commitments.commitsString}</p>
                                    </div>
                                    
                            </div>:null}
                            {data.additionalInfos.length?<div className='flex flex-col w-full  mb-3'>
                                        <p
                                            className='w-1/2 text-left mr-2 font-bold uppercase text-color-primary'
                                        >
                                            Additional informations:
                                        </p>
                                        {data.additionalInfos.map((skill:any, i:number) => (
                                            <div className='flex flex-col w-full shrink' key={i}>
                                                <div className='flex flex-row w-full shrink'>
                                                    <p className='w-1 mr-2 text-gray-800'>-</p>
                                                    <p className='flex shrink text-gray-800'>
                                                        {skill.title}
                                                    </p>
                                                </div>
                                                <div className='pl-4 flex flex-col flex-wrap'>
                                                {skill.data.map((el:number, k:number) => (
                                                    <div key={k} className='flex flex-row text-gray-600 shrink'>
                                                        <p className='text-gray-600 font-semibold mb-1 mr-2'>↳</p> 
                                                        <p className='text-gray-600'>{' '+el}</p>
                                                    </div>
                                                ))}
                                                </div>
                                        </div>))}
                            </div>:null}
                            {data.enviroment.length?<div className='flex flex-col w-full   mb-3'>
                                <p
                                    className='w-1/2 text-left mr-2 font-bold uppercase text-color-primary'
                                >
                                    Work Enviroment:
                                </p>
                                {data.enviroment.map((ed:any, i:number) => (
                                    <div key={i} className='ml-4 flex flex-row w-full'>
                                        <p className='w-1 mr-2 text-gray-800'>-</p>
                                        <p className='flex flex-wrap text-gray-800'>
                                            {ed}
                                        </p>
                                    </div>
                                ))}
                            </div>:null}
                        </div>
                        <div className='flex px-4 flex-col  items-center  justify-center'>
                            {data.group.length?<div className='flex flex-col w-full mb-3'>
                                <p
                                    className='w-1/2 text-left mr-2 font-bold uppercase text-color-primary'
                                >
                                    Employment groups:
                                </p>
                                <div className='flex flex-col w-full ml-4' >
                                    <p className='font-semibold'>Employer promotes equal employment opportunities for:</p>
                                    <div className='flex flex-col w-full pl-2 shrink'>
                                        <p className='flex flex-wrap text-gray-800' >
                                            {data.group.toString().replaceAll(',',', ')+'.'}
                                        </p>
                                    </div>
                                </div>
                            </div>:null}
                            {data.benefits.length?<div className='flex flex-col w-full  mb-3'>
                                        <p
                                            className='w-1/2 text-left mr-2 font-bold uppercase text-color-primary'
                                        >
                                            Benifits:
                                        </p>
                                        {data.benefits.map((beni:any, i:number) => (
                                            <div className='flex flex-col w-full shrink' key={i}>
                                                <div className='flex flex-row w-full shrink'>
                                                    <p className='w-1 mr-2 text-gray-800'>-</p>
                                                    <p className='flex shrink text-gray-800'>
                                                        {beni.title}
                                                    </p>
                                                </div>
                                                <div className='pl-4 flex flex-col flex-wrap'>
                                                {beni.data.map((el:any, k:number) => (
                                                    <div key={k} className='flex flex-row text-gray-600 shrink'>
                                                        <p className='text-gray-600 font-semibold mb-1 mr-2'>↳</p> 
                                                        <p className='text-gray-600'>{' '+el}</p>
                                                    </div>
                                                ))}
                                                </div>
                                        </div>))}
                            </div>:null}
                            <div className='flex flex-col w-full  mb-3'>
                                <p
                                    className='w-1/2 text-left mr-2 font-bold uppercase text-color-primary'
                                >
                                    How To Apply:
                                </p>
                                <div className='flex flex-col w-full' >
                                    <p className='font-bold ml-4'>Instructions:</p>
                                    <div className='flex flex-col w-full shrink'>
                                    {data.howToApply.map((ed:any, i:number) => (
                                        <div className='flex flex-col w-full  shrink' key={i}>
                                            <div key={i} className='ml-4 flex text-gray-800 flex-row w-full'>
                                                <p className='flex flex-wrap'>
                                                    {ed.title}
                                                </p>
                                            </div>
                                            <div className='pl-4 flex flex-col flex-wrap'>
                                                {ed.data.map((el:any, k:number) => (
                                                <div key={k} className='flex flex-row w-full ml-4 shrink'>
                                                    <p className='text-gray-600 font-bold pr-1 pb-1 mr-1'>‣</p> 
                                                    <p className='text-gray-600 flex shrink'>{el}</p>
                                                </div>
                                                ))}
                                            </div>

                                        </div>))}
                                    </div>
                                </div>
                            </div> 
                        </div>
                    </div> 
            </div>
        </>
    )
}


