'use client'
import React,{Fragment,useState,useEffect, useRef,memo, useCallback} from 'react'
import axios from "axios";
import qs from 'qs'
import { MagnifyingGlassIcon} from '@heroicons/react/20/solid'

import Select from "react-tailwindcss-select";
import { MapPinIcon} from '@heroicons/react/24/outline'
import Pagination from '@/components/Pagination';

import {LanguageList,PostedDateList,ExperienceList, PlatformList,EmploymentDurabilityList,ProvinceList, JobTypeList,WorkConditionList,AnnualSalaryList,WorkGroupList,WorkRegimeList} from '@/lib/staticData';
import JobCard from '@/components/jobCard'
import Location from '@/components/Location'
import Loading from '@/components/Loading'
import Image from 'next/image'
import NoResultSVG from "/public/svg/no-results.svg";
import SimpleBar from 'simplebar-react';
import JobPreviewModal from '@/components/JobsPreviewModal'
import JobsPreview from '@/components/JobDetails';
import {useCollapse} from "react-collapsed";

import 'simplebar-react/dist/simplebar.min.css';
import { getCategories } from '@/services/category';
import { findJobs, getSingleJob } from '@/services/jobs';
import { Option } from 'react-tailwindcss-select/dist/components/type';

const axiosInstance = axios.create({
    paramsSerializer: {
      serialize: qs.stringify, // (params) => qs.stringify(params, { arrayFormat: "brackets" }),
      encode: qs.parse,
    },
    validateStatus: function (status) {
      return true;
    },
});


const init = {
    articles:[],
    currentPage: 0,
    hasNextPage: null,
    hasPreviousPage: null,
    totalPages: 0,
    prevPage: null,
    nextPage: 0,
    numberResults: 0
}

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

interface Item extends Option  {_id:string,label:string} 




function Collapse({ isActive,getOptionsValue}:{isActive:boolean,getOptionsValue:any}) {
    
    const { getToggleProps, getCollapseProps,setExpanded, isExpanded } = useCollapse({easing:'cubic-bezier(0, 0, 0.58, 1.0)'});
    
    const [categories, setCategoriesData] = useState([{_id:'000000000',label:'All categories',value:'any'}])
    const [subcategories, setSubCategoryData] = useState([{_id:'000000000',label:'All sub categories',value:'any'}])

    
    const [WorkCategory, setSelectedِCategory] = useState<Item|null>(null)
    const [WorkSubcategory, setSelectedِSubCategory] = useState<Item|null>(null)
    const [jobType, setSelectedِJobType] =  useState<Item|null>(null)//useState({id:'000000002',name:'Any',value:'any'})
    //const [employmentType, setSelectedِWorkPeriod ] = useState(null)
    const [WorkRegime, setSelectedِWorkRegime] = useState<Item|null>(null)
    const [Language, setSelectedِLanguage] = useState<Item|null>(null)
    const [Experience, setSelectedِExperience] = useState<Item|null>(null)
    //const [Benifits, setSelectedِBenifits] = useState<Item|null>(null)
    const [PostedDate, setPostedDate] = useState<Item|null>(null) /// left
    const [WorkCondition, setWorkCondition]= useState<Item|null> (null)
    const [AnnualSalary, setAnnualSalary]= useState<Item|null>(null)
    const [WorkGroup, setWorkGroup]= useState<Item|null>(null)
    const [EmploymentType, setSelectedِWorkPeriod]= useState<Item|null>(null) // emt = employment type
    const [Platform, setPlatform] = useState<Item|null>(null)
    const [ searchParametres, setSearchParametres] = useState({})


    
    
    
    useEffect(()=>{
        const fetchCategory =  async ()=>{
                const fetchCategories = await getCategories()
                console.log('fetchCategorie:',fetchCategories)
                setCategoriesData([categories[0],...fetchCategories.categories.map((e:any)=>({id:e._id,label:e.title,value:e._id,subcategories:e.subcategories}))])
        }
        if(categories.length===1){
            fetchCategory()
        }
    },[categories])

    const selectCategoryChange = async (option:any)=>{
        console.log('option-cat',option)
        setSelectedِCategory(option)
        setSubCategoryData([subcategories[0],...option.subcategories.map((e:any)=>({id:e._id,label:e.title,value:e._id}))])
        setSelectedِSubCategory(null)
        setSearchParametres({...searchParametres,...{cat:option.value}})
        getOptionsValue({...searchParametres,...{cat:option.value}})

    }

    const selectSubCategoryChange = async (option:any)=>{
        console.log('value-sub-cat',option)
        setSelectedِSubCategory(option)
        setSearchParametres({...searchParametres,...{sub:option.value}})
        getOptionsValue({...searchParametres,...{sub:option.value}})

    }

    const selectJobType = async (option:any) => {
        setSelectedِJobType(option);
        console.log('value:',option)
        setSearchParametres({...searchParametres,...{jt:option.value}})
        getOptionsValue({...searchParametres,...{jt:option.value}})
    };
   
    const selectEmploymentType = async (option:any) => {
        setSelectedِWorkPeriod(option);
        setSearchParametres({...searchParametres,...{emt:option.value}})
        getOptionsValue({...searchParametres,...{emt:option.value}})

    };

    const selectWorkRegime = async (option:any) => {
        setSelectedِWorkRegime(option);
        setSearchParametres({...searchParametres,...{wr:option.value}})
        getOptionsValue({...searchParametres,...{wr:option.value}})

    };

    const selectLanguage = async (option:any) => {
        setSelectedِLanguage(option);
        setSearchParametres({...searchParametres,...{lg:option.value}})
        getOptionsValue({...searchParametres,...{lg:option.value}})
    
    };

    const selectExperience = async (option:any) => {
        setSelectedِExperience(option);
        setSearchParametres({...searchParametres,...{exp:option.value}})    
        getOptionsValue({...searchParametres,...{exp:option.value}})

    };

    const selectPostedDate = async (option:any) => {
        setPostedDate(option)
        setSearchParametres({...searchParametres,...{pd:option.value}})  
        getOptionsValue({...searchParametres,...{pd:option.value}})
  
    };

    const selectWorkCondition = async (option:any) => {
        setWorkCondition(option);
        setSearchParametres({...searchParametres,...{wc:option.value}}) 
        getOptionsValue({...searchParametres,...{wc:option.value}})   
    };

    const selectAnnualSalary = async (option:any) => {
        setAnnualSalary(option);
        setSearchParametres({...searchParametres,...{ys:option.value}})    
        getOptionsValue({...searchParametres,...{ys:option.value}})

    };


    const selectWorkGroup = async (option:any) => {
        setWorkGroup(option);
        setSearchParametres({...searchParametres,...{wg:option.value}})  
        getOptionsValue({...searchParametres,...{wg:option.value}})
  
    };


    const selectPlatform = async (option:any) => {
        setPlatform(option);
        setSearchParametres({...searchParametres,...{pf:option.value}})
        getOptionsValue({...searchParametres,...{pf:option.value}})

    };

    useEffect(()=>{
        if(isActive!==isExpanded){
            console.log('isActive-in useEffect:',isActive)
            console.log('isExpanded:',isExpanded)
            setTimeout(() => {
                setExpanded(prev=>!prev)
            }, 500);
        }
            
    
    },[isActive, isExpanded, setExpanded])
   

    return (
        <div {...getCollapseProps({ style: { width: "100%"} })}>
            <div className='flex flex-wrap flex-row w-full justify-between p-1 mt-5' >
                        <div className=' flex flex-wrap w-full'>
                            <div className='slc-class min-f-cat flex-col items-left justify-between p-3 '>     
                                <Select
                                    placeholder='Category' 
                                    value={WorkCategory}
                                    onChange={selectCategoryChange}
                                    options={categories}
                                    primaryColor=''
                                />
                            </div>
                            
                            <div className=' slc-class min-f-cat flex-col items-left justify-between p-3 '>     
                                <Select
                                    placeholder='Sub Category' 
                                    value={WorkSubcategory}
                                    onChange={selectSubCategoryChange}
                                    options={subcategories}
                                    primaryColor=''

                                />
                            </div>
                        </div>
                        <div className=' slc-class min-f-input flex-col items-left justify-between p-3 '>     
                            <Select
                                placeholder='Platform' 
                                value={Platform}
                                onChange={selectPlatform}
                                options={PlatformList}
                                primaryColor=''

                            />
                            
                        </div>
                        <div className='slc-class  min-f-input flex-col items-left justify-between p-3 '>     
                            <Select
                                placeholder='Date posted' 
                                value={PostedDate}
                                onChange={selectPostedDate}
                                options={PostedDateList}
                                primaryColor=''
                                
                            />
                        </div>
                        <div className='slc-class  min-f-input flex-col items-left justify-between p-3 '>     
                            <Select
                                placeholder='Language at work' 
                                value={Language}
                                onChange={selectLanguage}
                                options={LanguageList}
                                primaryColor=''
                            />
                        </div>
                        <div className='slc-class  min-f-input flex-col items-left justify-between p-3 '>     
                            <Select
                                placeholder='Type of job' 
                                value={jobType}
                                onChange={selectJobType}
                                options={JobTypeList}
                                primaryColor=''
                            />
                        </div>
                        <div className='slc-class flex  min-f-input flex-col items-left justify-between p-3 '>     
                            <Select
                                placeholder='Experience' 
                                value={Experience}
                                onChange={selectExperience}
                                options={ExperienceList}
                                primaryColor=''
                            />
                        </div>
                        <div className='slc-class flex  min-f-input flex-col items-left justify-between p-3 '>     
                            <Select
                                placeholder='Work Regime' 
                                value={WorkRegime}
                                onChange={selectWorkRegime}
                                options={WorkRegimeList}
                                primaryColor=''

                            />
                        </div>
                        <div className='slc-class flex  min-f-input flex-col items-left justify-between p-3 '>     
                            <Select
                                placeholder='Employment durability' 
                                value={EmploymentType}
                                onChange={selectEmploymentType}
                                options={EmploymentDurabilityList}
                                primaryColor=''

                            />
                        </div>
                        <div className='slc-class flex min-f-input flex-col items-left justify-between p-3'>     
                            <Select
                                placeholder='Salary Range' 
                                value={AnnualSalary}
                                onChange={selectAnnualSalary}
                                options={AnnualSalaryList}
                                primaryColor=''

                            />
                        </div>
                        <div className='slc-class flex min-f-input flex-col items-left justify-between p-3'>     
                            <Select
                                placeholder='Work group' 
                                value={WorkGroup}
                                onChange={selectWorkGroup}
                                options={WorkGroupList}
                                primaryColor=''
                            />
                        </div>
                        <div  className='slc-class flex min-f-input flex-col items-left justify-between p-3 '>     
                            <Select
                                placeholder='Employment period' 
                                value={WorkCondition}
                                onChange={selectWorkCondition}
                                options={WorkConditionList}
                                primaryColor=''
                            />
                        </div>
                        
                        
                </div>
        </div>
    );
}


export default function FindJobs() {

    const [loading , setLoading] = useState(false)
    const [PreviewLoading, setPreviewLoading] = useState(false)
    const [resultLayout , setResultLayout] = useState(false)

    //! ---------- Search Filter ---------------------
    //,sub,
    const [isPreview ,setIsPreview ] = useState(true)
    const [isCollapse ,setCollapseStatus ] = useState(false)
    const [searchInput, setSearchInput] = useState('')
    const [WorkLocation, setWorkLocation] = useState<string>('')
    
    const [page, setPage] =useState(1)
    const [searchResult, setResults] = useState(0)
    const [searchButtonValue, setSearchButtonValue] = useState('Advance search')

    const [articles, setArticles ] = useState<any[]>([])
    const [jobPreview, setJobPreview] = useState(initArticle)
    const [revalidate, setRevalidate] = useState(true)
    //! ------------------------------------------------
    const [onMobile, setOnMobile] = useState(false)
    const [LocationmodalOpen , setLocationModalOpen] = useState(false)
    const [previewModalOpen , setPreviewModalOpen] = useState(false)
    const [searchParametres, setSearchParametres] = useState<object>({})
   // const [modalFilterOpen , setModalFilterOpen] = useState(false)

    
    const [data ,setData] = useState(init)

    function classNames(...classes:any) {
        return classes.filter(Boolean).join(' ')
    }

     
    const inputRef = useRef<HTMLInputElement>(null)
    const listRef = useRef<HTMLDivElement>(null)

    let debounceTimer:NodeJS.Timeout| number

    function debounce(func:Function, delay:number) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(func, delay);
    }


    const getParams = ()=>{
        let params = {}

        if(searchInput.length>=3){
            params = {...params,q:searchInput}
        }


        if(page){
            params={
                ...params,page:page
            }
        }

        

        if(WorkLocation){
            const loc = WorkLocation.split('-')
            if(loc.length===1){
                const wl = ProvinceList.find(e=>e.label===loc[0])
                if(wl){
                    params = {
                        ...params,loc:wl.value
                    }
                }
            }else{
                params = {
                    ...params,loc:loc[0]
                }
            } 
            
        }

        return {...params, ...searchParametres}
    }


    const onPreviewSearch =  async () => {
        if (!loading) {
            setLoading(true);
        }
        try {
            const query = getParams();
            console.log('query-preview:', query);
            const {data} = await findJobs(query)
            setRevalidate(false);
            console.log('data:', data);
            setTimeout(() => {
                setLoading(false);
                if (data.success) {
                    setResults(data.numberResults);                   
                }
            }, 400);
    
        } catch (error) {
            console.log("Error:", error);
            setLoading(false);
        }
    }

    const onSearchFull =  async () => {
        if (!loading) {
            setLoading(true);
        }
        try {
            const query = getParams();
            console.log('query:', query);
            const {data} = await findJobs(query)
            setRevalidate(false);
            console.log('data:', data);
            setData(data);
            setTimeout(() => {
                setLoading(false);
                if (data.success) {                   
                        setArticles(data.articles);
                        setResults(data.numberResults);
                        if (listRef.current) {
                            listRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                }
            }, 400);
    
        } catch (error) {
            console.log("Error:", error);
            setLoading(false);
        }
    }


    const collapsSwitch = ()=>{
        console.log('isCollapse:',isCollapse)
        setCollapseStatus(!isCollapse)
        setSearchButtonValue('')
        setTimeout(()=>{
            setSearchButtonValue(!isCollapse?'Simple search':'Advance search')
        },800)
    }

    const onOpenLocationModal = ()=>{
        setLocationModalOpen(!LocationmodalOpen)
    }

    const closeLocationModal=()=>{
        setLocationModalOpen(false)
    }


    const getWorkLocation = async (value:any)=>{
        console.log('value-loc:',value)
        setWorkLocation(value)
        setRevalidate(true)
    } 

    const searchInputOnChange =  ()=>{
        debounce( async function () {
            if(inputRef.current){
                setSearchInput(inputRef.current.value)
                setRevalidate(true)
            }    
        },1000)
    }

    const AdvancedSearchOptions =(data:any)=>{
        setSearchParametres(data)
        console.log('data-search-parametres:',data)
        if(Object.keys(data).length){
            setRevalidate(true)
        }
    }
  
  
    useEffect(() => {
        console.log('revalidate && isPreview:',revalidate && isPreview)
        if (revalidate && isPreview) {
            (async () => onPreviewSearch())();
        }
    }, [revalidate,isPreview]);

/*     useEffect(()=>{
        if(resultLayout){
           // onSearchFull()
        }else{
           // onSearchPreviewInput()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[page,searchInput,WorkCategory,WorkSubcategory,Platform,WorkLocation,WorkCondition,Language,Experience,AnnualSalary,WorkGroup,WorkRegime,EmploymentType,jobType])
 */


    const getArticle = async (id:string) => {
        if(!PreviewLoading){
          setPreviewLoading(true)
        }
  
        const {data,status} = await getSingleJob(id)
        console.log('data-in-single:',data)
        if(status === 200){
            setJobPreview(data.article.projection)
            setTimeout(() => {
                setPreviewLoading(false)
            }, 400);
        }else{
            setPreviewLoading(false)
        }
    };


    const pageChange = (value:number)=>{
        console.log('vall:',value)
        setPage(value)
    }
    const onSearch = ()=>{
        setIsPreview(false)
        onSearchFull()
        setResultLayout(true)
    }

    useEffect(()=>{
        console.log('searchResult:',searchResult)
        if(articles.length){
            getArticle(articles[0]._id)
        }
    },[articles])

    useEffect(()=>{
        if(page!==data.currentPage && !isPreview){
            onSearchFull()
        }
    },[page,revalidate])


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


    // eslint-disable-next-line react/display-name
    const List = ({data}:any)=>{
        const {articles,numberResults} = data
        if(numberResults===0){
            return <div className=' flex items-center flex-col p-3.5 m-3.5'>
                <Image priority src={NoResultSVG} alt='no results' height={260}/>
                <p className='font-semibold text-gray-500 mt-6 text-2xl uppercase'>No jobs found</p>
            </div>
        }

     
        return articles.map((job:any,index:number) => <JobCard job={job} getArticle={setPreview} reverse={false} key={index} />) 
        
    }


   
    return (

        <>
            <div className='w-full bg-gray-100 flex flex-col items-center container '>
                    {loading && !resultLayout?<div className=' h-full bg-slate-200/50 w-full flex justify-center items-center absolute z-50'>
                                <Loading/>
                        </div>:null}
                    <div className="py-10">
                                <h1 className='px-4 mx-2 py-2 uppercase tracking-wider border-b-indigo-600 text-3xl font-semibold'><span className='text-color-primary'>{searchResult?searchResult:0}</span> job offer available for you</h1>
                                <h3 className='px-4 mx-2 py-2 tracking-wider border-b-indigo-600 text-1xl font-semibold'>refine your search by using the form below </h3>
                    </div>
                    <div className='w-full h-full flex-col flex items-start relative justify-center '>  
                        
                        
                        <div className='grow w-full '>
                            <div className="bg-gray-100 flex flex-col justify-center items-center bg-blue-100 w-full">
                                
                                <div className="w-3/4">
                                    <div className="relative z-10 flex flex-col items-center mx-4 p-6  bg-white rounded-xl mb-4 ">
                                        
                                            <div className='flex w-full'>
                                                <div className="flex w-full ">
                                                    <div className="flex w-3/4 bg-gray-100 p-3  rounded-lg">
                                                            <MagnifyingGlassIcon className="h-7 w-7 text-gray-400" aria-hidden="true" />
                                                            <input onChange={searchInputOnChange} ref={inputRef} className="bg-gray-100 outline-none w-full" type="text" placeholder="Article name or keyword..." />
                                                    </div>
                                                    <div className="flex w-3/4 bg-gray-100 p-3  space-x-4 rounded-lg mx-2">  
                                                        <MapPinIcon className="h-7 w-7 text-gray-400" aria-hidden="true"/>                                    
                                                        <input readOnly onClick={onOpenLocationModal} value={WorkLocation} className="bg-gray-100 outline-none w-full" type="text" placeholder="location" />
                                                        <Location isOpen={LocationmodalOpen} closeModal={closeLocationModal} getLocation={getWorkLocation}/>
                                                    
                                                    </div>
                                                </div>
                                                
                                                <button
                                                        type="submit"
                                                        onClick={onSearch}
                                                        className="justify-center flex rounded-lg bg-red-600 px-5 py-3 font-semibold text-white hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition duration-3000 cursor-pointer"
                                                    >
                                                        Search
                                                </button>
                                            </div> 
                                            <Collapse isActive={isCollapse} getOptionsValue={AdvancedSearchOptions} />   
                                            <button type='button' className='absolute bottom-0.5 right-6 underline text-xs text-blue-300 pr-0.5' onClick={collapsSwitch}>{searchButtonValue} </button>
                                        </div>
                                </div>
                            </div> 
                        </div>
                        <JobPreviewModal isOpen={previewModalOpen} closeModal={closePreviewModal} >  
                            <div className='w-2/3 grow basis-1/2  bg-white scrollbar sticky overflow-y-auto overscroll-auto top-4 mt-4 py-4 cursor-pointer  transition-all duration-1000 border rounded md:flex md:flex-wrap md:preview-w'>
                                <div  className="w-full p-4 flex justify-center items-center">
                                    <JobsPreview data={jobPreview} onMobile={onMobile}/>        
                                </div>
                            </div>
                        </JobPreviewModal>

                        {resultLayout?<div className='w-full min-h-screen bg-gray-100 py-20 flex items-center md:px-8 px-2  justify-center flex-col'>
                                        {/* {true && resultLayout?<div className='bg-slate-200/50 w-full flex justify-center items-center min-h-full h-screen absolute z-50'>
                                                <Loading />
                                        </div>:null} */}
                                        <div className='w-full h-full flex justify-center relative mt-8 items-start flex-row'>  

                                            <div ref={listRef} className='grow w-full basis-1/3 px-2 h-full py-2 flex m-2 flex-col items-start justify-center flex-wrap'>
                                                    <List data={data}/>
                                                    <div className=' flex justify-center'>
                                                        <Pagination totalItems={data.numberResults} onState={true} onPageChange={pageChange}/>
                                                    </div>
                                                    
                                            </div>
                                            {!onMobile?<div className='w-2/3 grow basis-1/2  bg-white scrollbar sticky overflow-y-auto overscroll-auto top-4 mt-4 py-4 cursor-pointer  transition-all duration-1000 border rounded md:flex md:flex-wrap preview-w'>
                                                            <div  className="w-full p-4 flex justify-center items-center">
                                                                {PreviewLoading?<Loading/>:<JobsPreview onMobile={onMobile} data={jobPreview}/>}
                                                            </div>
                                            </div>:null}
                                        </div>
                        </div>:null}
                    </div>
            </div>
        </>

    )
}
