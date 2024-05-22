import { ARTICLE_RES } from "@/app/api/articles/route"
import axios from "axios"



export const getJobs = async (page:number)=>{
    
    const res = await fetch(`/api/articles?page=${page}`)
    const data = res.json()
    console.log('data:',data)
    return data
}

export const getSingleJob = async (id:string):Promise<ARTICLE_RES>=>{
    
    const res = await axios.get(`/api/articles?id=${id}`)
    return {data:res.data, status:res.status}
}