import axios from "axios"



export const getCategories = async ()=>{
    const {status,statusText,data} = await axios.get(`/api/categories`)
    return data
}