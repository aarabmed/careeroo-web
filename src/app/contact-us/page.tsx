'use client'

import React,{useRef, useState} from "react";
import axios from "axios"

import * as Yup from "yup"
import { Formik, Form, Field,useField } from "formik"
import { TextField } from "formik-material-ui"

import ReCAPTCHA, { ReCAPTCHAProps } from "react-google-recaptcha";


const initialValues = {
  name: "",
  subject: "",
  message: "",
  email: "",
}


let validationSchema = Yup.object().shape({
    name: Yup.string().trim().required("Required"),
    subject: Yup.string().trim().required("Required"),
    email: Yup.string().matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'enter a valid email').required("Required"),
    message: Yup.string().max(1000).required("Required"),
})


/* const MyTextArea = ({label,...props}) => {
    const [field,meta] = useField('message');
    return (
        <>  
            <div className="MuiInputBase-fullWidth MuiInputBase-formControl message-text-area">
                <textarea  {...props} className={ meta.error?'message-error':''}/>
                    
            {meta.touched && meta.error ? (
                <p className="Mui-error">{meta.error}</p>
            ) : null}
            </div>
        </>
    );
}; */


const axiosInstance = axios.create({
  validateStatus: function (status)
  {
      return true
  }
});

export default function ContactUS(){
  const [message,setMessage] = useState('');
  const [captcha,setCaptcha] = useState('');
  const [error,setError] = useState('');
  const [loading,setLoading] = useState(false);
  const recaptchaRef = React.createRef<ReCAPTCHA>()


  const axiosHeader = ()=>{
    const config = {
        headers: { 'Content-type': 'application/json' },
    };
    return config
  }
  
  const onReCAPTCHAChange = (captchaCode:any) => {
    // If the reCAPTCHA code is null or undefined indicating that
    // the reCAPTCHA was expired then return early
    if(!captchaCode) {
      return;
    }
    // Else reCAPTCHA was executed successfully so proceed with the 
    // alert
    setError('')
    setCaptcha(captchaCode)
    // Reset the reCAPTCHA so that it can be executed again if user 
    // submits another email.
    
  }

  const onSubmit = (data:any) => {
    if(!captcha){
      setError('Validate the captcha check box, than click submit')
      return
    }
    setLoading(true);
    axiosInstance.post(
      '',
      {captcha,...data},
      axiosHeader()
   ).then(res=>{
        
        if (res.status===200) {
            setMessage(res.data.message)
            setLoading(false);
            if(recaptchaRef.current)recaptchaRef.current.reset();
        }else if(res.status===422){
            setLoading(false);
            setError(res.data.message)
            if(recaptchaRef.current)recaptchaRef.current.reset();
        }
        }).catch(e=>{      
            setLoading(false);
            if(recaptchaRef.current)recaptchaRef.current.reset();
        })                                  
  }

  
  

  return <div className='w-full min-h-screen bg-gray-100 py-20 flex items-center md:px-8 px-2  justify-center flex-col'>
                <h1 className='px-4 mx-2 py-2 uppercase tracking-wider border-b-2 border-b-indigo-600 text-3xl font-semibold'>Contact us</h1>
                <div className='w-full h-full flex justify-center mt-8 items-start flex-row'>  
                <div className="w-2/4 h-full flex justify-center mt-8 items-start flex-col px-16 py-10 bg-white">

               
                    {message?<div className='w-1/2'><div className="contact-thankyou"><p><strong>{message}</strong></p></div></div>:<div className=''>
                                <div className="px-3 mb-6">
                                    <p>Write to us, if you have any question or suggestion related to our service.</p>
                                </div>
{/*                             {error?<div className="contact-message"><p><strong>{error}</strong></p></div>:null}
 */}                            <form className="w-full max-w-lg">
                                    <div className="w-full px-3 mb-6 md:mb-0">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-fullname">
                                                Full Name
                                            </label>
                                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-fullname" type="text" placeholder="Jane Bishup"/>
                                    </div>
                                        <div className="w-full px-3 mb-6 md:mb-0">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-email">
                                                Email
                                            </label>
                                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-email" type="email" placeholder="your@email.com"/>
                                        </div>
                                        <div className="w-full px-3">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-subject">
                                                Subject
                                            </label>
                                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-subject" type="text" placeholder="your subject" />
                                        </div>
                                        <div className="w-full  px-3 mb-6 md:mb-0">
                                            <label htmlFor="message" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Message</label>
                                            <textarea id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-200 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                                        </div>
                                        <ReCAPTCHA
                                              ref={recaptchaRef}
                                              size="normal"
                                              sitekey='6LdxipMhAAAAAEBS5lO6UBsaHtd6ioGqU5yBHEkl'
                                              onChange={onReCAPTCHAChange}
                                        />   
                                </form>
                            
                        </div>}
                    </div>
                </div>
        </div> 

}


