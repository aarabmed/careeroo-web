import { ARTICLE_RES } from "@/app/api/articles/route"
import axios from "axios"
import qs from 'qs'


const axiosInstance = axios.create({
    paramsSerializer: {
      serialize: qs.stringify, // (params) => qs.stringify(params, { arrayFormat: "brackets" }),
      encode: qs.parse,
    },
    validateStatus: function (status) {
      return true;
    },
});

export const getJobs = async (page:number)=>{
    
    const res = await fetch(`/api/articles?page=${page}`)
    const data = res.json()
    console.log('data:',data)
    return data
}


export const findJobs = async (query:object)=>{
    
    const {data} = await axiosInstance.get(`/api/articles/search/`,{ params: query })
    return data
}

export const getSingleJob = async (id:string):Promise<ARTICLE_RES>=>{
    
    const res = await axios.get(`/api/articles?id=${id}`)
    return {data:res.data, status:res.status}
}