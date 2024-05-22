import React from 'react'




export default function Index({data}:{data:any}) {


    let list:{status:boolean,approch:string ,value:string}[] = [
        {status:false,approch:'Online' ,value:'https://www.pro-careservices.ca/'},
        {status:false,approch:'By email' ,value:'not available'},
        {status:false,approch:'By phone' ,value:'not available'},
        {status:false,approch:'By mail' ,value:'not available'},
        {status:false,approch:'In person' ,value:'not available'},
        {status:false,approch:'By fax' ,value:'not available'}
    ]

    data.forEach((element:any, i:number) => {
        if(element['Online']){
          const obj = list.find(e=>e.approch==="Online")
          if(obj){
            obj.value = element['Online']
            obj.status = true
          }
          return
        }
        else if(element['By email']){
          const obj = list.find(e=>e.approch==="By email")
          if(obj){
            obj.value = element['By email'].trim()
            obj.status = true
          }
          return
        }
        else if(element['By phone']){
          const obj = list.find(e=>e.approch==="By phone")
          if(obj){  
            obj.value = element['By phone']
            obj.status = true
          }
          return
        }
        else if(element['By mail']){
          const obj = list.find(e=>e.approch==="By mail")
          if(obj){
            obj.value = element['By mail']
            obj.status = true
          }
          return
        }
        else if(element['In person']){
          const obj = list.find(e=>e.approch==="In person")
          if(obj){
            obj.value = element['In person']
            obj.status = true
          }
          return
        }else if(element['By fax']){
          const obj = list.find(e=>e.approch==="By fax")
          if(obj){
            obj.value = element['By fax'] 
            obj.status = true
          }
          return
        }
      
    });


    return <div  className="w-full p-5 flex flex-col justify-center p items-start">
        {list.map((e,i)=>
            <div key={i} className='flex flex-row w-full my-1'>
                <div className='w-28'>
                    <p className='font-semibold'>{e.approch}:</p>
                </div>
                <div className='w-4/5'>
                    {Array.isArray(e.value)?<ul className='mb-2'>{e.value.map((e,i)=>e.length?<li className='font-medium' key={i}>{e}</li>:null)}</ul>:<p className={e.value!=='not available'?'font-semibold text-cyan-500':'font-semibold' } >{e.value}</p>}
                </div>
            </div>  
        )}
    </div>
}
