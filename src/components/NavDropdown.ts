'use server'
import {headers } from "next/headers"

type SUB = {
    key:number,name:string, url:string,active:boolean,subs:SUB[],visible?:boolean
}
export async function  getNavigation():Promise<Array<SUB>> {
    const ROLE = headers().get('role')
    console.log('ROLE:',ROLE)
    const guideSubs:Array<SUB> = [
        {key:1,name:"Interviewing", url:'/guide/interviewing',active:false,subs:[]},
        {key:2,name:"Resumes", url:'/guide/resumes',active:false,subs:[]},
        {key:3,name:"Cover Letter", url:'/guide/cover-letter',active:false,subs:[]},
        {key:4,name:"Resignation", url:'/guide/resignation',active:false,subs:[]}
    ]

    const navigation:Array<SUB> = [
        {key:2,name:"Dashboard", url:'/me/dashboad',active:false,subs:[],visible:ROLE==='user'},
        {key:3,name:"listed Jobs", url:'/jobs',active:false,subs:[],visible:true},
        {key:4,name:"Find Job", url:'/find-job',active:false,subs:[],visible:true},
        {key:6,name:"Guide", url:'/guide',active:false,subs:guideSubs,visible:true}
    ]   
   
    return navigation
}