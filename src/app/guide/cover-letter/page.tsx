'use client'

import React, { useEffect, useRef,useState } from 'react'

import Image from 'next/image';

import { useInView, InView } from "react-intersection-observer";


export default function CoverLetter() {
    const [activeSection, setActiveSection] = useState('understanding-the-decision-of-resigning')
    const olRef = useRef(null)
    const { ref, inView } = useInView({
        threshold: 0.5,
    });
    
    

    useEffect(()=>{
    },[])

    const setInView = (inView:boolean, entry:IntersectionObserverEntry) => {
        console.log('inView:',inView)
        const target = entry.target.getAttribute("id")
        if (inView && target) {
          setActiveSection(target)
        }
    }; 

    return (

        <>
            <div className="w-full cl-bg banner-bg bg-no-repeat bg-contain bg-right-bottom"> 
                <div className='w-2/5 flex flex-col  items-start justify-center p-2.5 h-max'>
                    <h1 className='text-white text-6xl'>
                        Cover letter
                    </h1>
                    <p className='text-white text-base mt-6'>
                        When you&apos;re on the job hunt, a well-crafted cover letter offers a glimpse into your personality and convinces employers of your value. Keep it concise, around three paragraphs, and highlight examples from your past that demonstrate your qualifications for the position.
                    </p>
                </div>
                <Image  width={700} height={350} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" property="true" src="/images/cover-letter-web.jpg" className="relative shadow-banner-img right-12 -bottom-28" alt="resignation"/>
            </div>
            <div className='min-h-screen bg-white py-20 flex  items-start md:px-8 px-2  justify-center flex-row'>
                <div className='bg-gray-100 w-1/4 py-4 table-content '>
                    <ol ref={olRef}>
                        <li className={activeSection === "understanding-the-decision-of-resigning"?'active-nav':''}><a href="#understanding-the-decision-of-resigning">Understanding the Decision of resigning</a></li>
                        <li className={activeSection === "how-to-resign-professionally"?'active-nav':''}><a href="#how-to-resign-professionally">How to resign professionally</a></li>
                        <li className={activeSection === "explain-resignation"?'active-nav':''}><a href="#explain-resignation">How to explain my resignation</a></li>
                        <li className={activeSection === "resignation-letter"?'active-nav':''}><a href="#resignation-letter">Resignation letter</a></li>
                        <li className={activeSection === "what's-next-after-i-resign"?'active-nav':''}><a href="#what's-next-after-i-resign">What&apos;s next after i resign</a></li>
                    </ol>
                </div>
                <div className='h-full mx-4 w-1/2 py-4' ref={ref}>
                    {/* <InView onChange={setInView} threshold={0.4} id='understanding-the-decision-of-resigning'>
                            {({ ref }) => {
                                    return (<div  ref={ref} className='flex-wrap blog-p' id='understanding-the-decision-of-resigning'>
                                    
                                    <h2 className='px-4 mx-2 py-2 text-3xl font-semibold'>Understanding the Decision of resigning</h2>
                                    <p className=''>It's essential to approach the decision to resign with a strategic mindset. Before proceeding, conduct a thorough assessment of your motivations. Encourage yourself to reflect on how your departure aligns with your career aspirations and personal development goals. By fostering this introspective approach, you can ensure that you make informed decisions that support your professional journey.</p>
                                    <p className=''>
                                        When it comes to resigning from your current job, explaining your decision is inevitable. Your employer will likely seek insight into why you've chosen to move on, and prospective employers will be keen to understand your motivations for seeking new opportunities. It's crucial to handle these discussions with care and discretion, ensuring that you communicate your reasons respectfully. By doing so, you can depart on good terms with your current employer while also presenting yourself positively to potential future employers
                                    </p>
                                    <p>
                                        Here are some pros and cons that can help you determine if this is the right move for you.
                                    </p>
                                    <h5 className='px-4 mx-2'>Pros of Taking a Break from Work:</h5>
                                    <ul>
                                        <li>Chance to grow</li>
                                        <li>Time to relax and think</li>
                                        <li>Meeting new people</li>
                                        <li>Finding personal happiness</li>
                                        <li>Figuring out your next steps</li>
                                        <li>Learning something new</li>
                                        <li>Pursuing a hobby or interest</li>
                                    </ul>
                                    <br/>
                                    <h5 className='px-4 mx-2'>Cons of Taking a Break from Work:</h5>
                                    <ul>
                                        <li>Could slow down your career</li>
                                        <li>May lose contact with coworkers</li>
                                        <li>Could make rejoining work harder</li>
                                        <li>lack of steady flow of income</li>
                                        <li>Explaining the break to a new employer</li>
                                    </ul>
            
                            </div>)
                        }}

                    </InView> */}
                    
                </div>
            </div>
        </>
    )
} 

