'use client'
import React, { Suspense, useEffect, useState } from 'react'
import axios from "axios";
import qs from 'qs'
import JobCard from '@/components/jobCard'
import Loading from '@/components/Loading'
import Pagination from '@/components/Pagination';
import JobsPreview from '@/components/JobDetails';
import { FunnelIcon } from '@heroicons/react/24/outline'
import JobPreviewModal from '@/components/JobsPreviewModal'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {  useAppDispatch } from '@/lib/store';
import { BasicFilter } from '@/components/BasicFilter';
import { getJobs, getSingleJob } from '@/services/jobs';

const axiosInstance = axios.create({
    paramsSerializer: {
      serialize: qs.stringify, // (params) => qs.stringify(params, { arrayFormat: "brackets" }),
      encode: qs.parse,
    },
    validateStatus: function (status) {
      return true;
    },
});

/* const Location = (loc,locs)=>{
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
 */
const initArticle = {
    title: "",
    date: "",
    job_id: "",
    location: "",
    business: "",
    salaryType: "",
    yearlySalary: [],
    jobSalary: "",
    negotiable: false,
    verified: true,
    platform: "jobbank",
    commission: "",
    jobType: "",
    additionalInfos: [],
    externalLink: "",
    group: [],
    regime: "",
    periode: "",
    benefits: [],
    target: "",
    locations: [],
    languages: {
        lang: "en",
        language: "English"
    },
    responsibilities: {
         tasks: [],
        supervision: []
    },
    commitments: {
      commitsArray: [],
      commitsString: ""
    },
    vacancy: "",
    workHours: "",
    enviroment: [
        ""
    ],
    zip: "",
    address: "",
    education: [],
    experience: {
        duration: 0,
        Extype: "",
        value: ""
    },
    howToApply: [],
    specialization: [],
    instructions:[],
    organization: {
        title: "",
        hasLink: false,
        link: ""
    },
    startAt: "",
    slug: ""
}

function Page() {
    const dispatch = useAppDispatch()
    const [jobPreview, setJobPreview] = useState(initArticle)
    const [loading , setLoading] = useState(true)
    const [onMobile, setOnMobile] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [numberResults, setNumberResults] = useState(0)
    const [articles, setArticles] = useState<any[]>([])
    const [previewModalOpen , setPreviewModalOpen] = useState(false)

    const [modalFilterOpen , setModalFilterOpen] = useState(false)

    const getArticle = async (id:string) => {
      if(!loading){
        setLoading(true)
      }

      const {data,status} = await getSingleJob(id)
      console.log('data-in-single:',data)
      if(status === 200){
          setJobPreview(data.article.projection)
          setTimeout(() => {
            setLoading(false)
          }, 400);
      }else{
          setLoading(false)
      }
    };

    const getArticles  = async()=>{
        const data = await getJobs(currentPage)
        console.log('data:',data)
        setArticles(data.articles)
        setNumberResults(data.numberResults)
    }


    useEffect(()=>{
        if(articles.length){
            getArticle(articles[0]._id)
        }
    },[articles])

    useEffect(()=>{
        getArticles()
    },[currentPage])



    useEffect(()=>{
      const handleResize = () => {
        // Perform actions on window resize
        console.log('window.innerWidth:',window.innerWidth)
        if(window.innerWidth>960){
          console.log('isMob:',onMobile)
          if(onMobile){
            setOnMobile(false)
          }
          if(previewModalOpen){
            setPreviewModalOpen(false)
          }
        }
        if(window.innerWidth<=960){
          if(!onMobile){
            setOnMobile(true)
          }
          
        }
      };
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    },[onMobile])

    const onClickFilter = ()=>{
        setModalFilterOpen(!modalFilterOpen)
    }

    const closeModal=()=>{
        setModalFilterOpen(false)
    }

    const closePreviewModal=()=>{
      setPreviewModalOpen(false)
    }

    const setPreview = (id:string)=>{
      getArticle(id)
      openPreviewModal()
    }


    const openPreviewModal = ()=>{
      if(onMobile){
        setPreviewModalOpen(true)
      }
    }
    
    const searchParams = useSearchParams();
    const router = useRouter()
    const pathName= usePathname()
    const updateQuery = (key:string,value:string)=>{
        const query = new URLSearchParams(Array.from(searchParams.entries()))

        const oldValue=query.get(key)
        if(oldValue!==value){
            query.set(key,value)
        }else{
            query.delete(key)
        } 

        const newQuery = query.toString() ? `?${query.toString()}`:''
        router.push(`${pathName}${newQuery}`);
    }

    

    


    return (
        <div className='flex-1'>
            <BasicFilter isOpen={modalFilterOpen} closeModal={closeModal}/>
            <JobPreviewModal isOpen={previewModalOpen} closeModal={closePreviewModal} >
            
            <div className='w-2/3 grow basis-1/2  bg-white scrollbar sticky overflow-y-auto overscroll-auto top-4 mt-4 py-4 cursor-pointer  transition-all duration-1000 border rounded md:flex md:flex-wrap md:preview-w'>
                <div  className="w-full p-4 flex justify-center items-center">
                    <JobsPreview data={jobPreview} onMobile={onMobile}/>        
                </div>
            </div>
            </JobPreviewModal>
            <div className='w-full min-h-screen bg-gray-100 py-20 flex items-center md:px-8 px-2  justify-center flex-col'>
                <h1 className='px-4 mx-2 py-2 uppercase tracking-wider border-b-2 border-b-indigo-600 text-3xl font-semibold'>Available Jobs</h1>
                <div className='w-full h-full flex justify-center mt-8 items-start flex-row'>  
                    <div className='grow w-full basis-1/3 px-2 h-full py-2 flex m-2 flex-col items-start justify-center flex-wrap'>
                        <div className='flex w-full min-h-full mb-2'>
                            <button
                                onClick={onClickFilter}
                                type="submit"
                                className="flex w-full items-center justify-center rounded-sm bg-secondary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                <FunnelIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                                Filter Offers
                            </button>
                        </div>
                        {
                            Array.isArray(articles) && articles.length > 0 ? articles?.map((job) => {
                                return (
                                    <JobCard reverse={false} job={job} key={job._id} getArticle={setPreview}/>
                                )
                            }) : <p>No jobs found</p>
                        }


                        <div>
                            <Pagination totalItems={numberResults} onState={false} onPageChange={undefined} />
                        </div>
                    </div>
                    {!onMobile?<div className='w-2/3 grow basis-1/2  bg-white scrollbar sticky overflow-y-auto overscroll-auto top-4 mt-4 py-4 cursor-pointer  transition-all duration-1000 border rounded md:flex md:flex-wrap preview-w'>
                            <div  className="w-full p-4 flex justify-center items-center">
                                {loading?<Loading/>:<JobsPreview onMobile={onMobile} data={jobPreview}/>}
                            </div>
                    </div>:null}
                </div>
            </div> 
        </div>
     
    )
}


export default function Index(){
  return <Suspense>
      <Page/>
  </Suspense>
}

