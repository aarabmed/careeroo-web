import axios from "axios";


export type City = {
    name: string,
    _id: string
}
type RES = {
    success:boolean, 
    cities?:City[],
    message?:string
}
export const getCitiesByProvince= async(province:string):Promise<RES>=>{

    const {status,statusText,data} = await axios.get(`/api/provinces/${province}`)
    return data
}