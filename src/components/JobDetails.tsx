
import React from 'react'
import JobsPreviewFull from './JobPreviewFull';
import JobsPreviewShort from './JobPreviewShort';


export default function JobsDetails({data,onMobile}:{data:any,onMobile:any}) {
    const {platform}=data
    return (platform==='jobbank'?<JobsPreviewFull data={data} onMobile={onMobile}/>:<JobsPreviewShort data={data}/>)
}


