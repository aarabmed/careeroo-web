'use server'
import {headers } from "next/headers"


enum TypeElm  {
    'route',
    'button'
}

export type Elements = {
    key:number,icon:string,name:string, url:string,active:boolean,type:TypeElm
}
export async function  getUserNavigation():Promise<Array<Elements>> {
    const ROLE = headers().get('role')

    const guestNav:Array<Elements> = [
        {key:1,name:"Login", icon:'login',url:'/auth/login',active:false,type:TypeElm.route},
        {key:2,name:"Register",icon:'register', url:'/auth/register',active:false,type:TypeElm.route},
    ]

    const userNav:Array<Elements> = [
        {key:2,icon:'notification',name:"notification", url:'/me/alerts',type:TypeElm.route,active:false},
        {key:3,icon:'saved-jobs',name:"saved-jobs", url:'/me/saved-jobs',type:TypeElm.route,active:false},
        {key:4,icon:'profil',name:"profil", url:'/me/profile',type:TypeElm.route,active:false},
        {key:6,icon:'logout',name:"logout", url:'',type:TypeElm.button,active:false}
    ]
    
    return ROLE === 'user' ? userNav : guestNav
}