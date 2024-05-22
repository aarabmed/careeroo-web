'use client'
import React, { useEffect, useRef,useState } from 'react'

import Image from 'next/image';
import { useInView, InView } from "react-intersection-observer";


export default function DisplayJobs() {
    const [activeSection, setActiveSection] = useState('')
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
            <div className="w-full banner-bg res-bg bg-no-repeat bg-contain bg-right-bottom"> 
                <div className='w-2/5 flex flex-col  items-start justify-center p-2.5 h-max'>
                    <h1 className='text-white text-6xl'>
                        Resignation
                    </h1>
                    <p className='text-white text-base mt-6'>
                    Making the decision to leave your job is significant and can be challenging one. However, it's essential to handle it with professionalism and care, regardless of the circumstances. Here we will guide you through the steps toward leaving your job in a way that will help you maintain good relationships and ensure a smooth transition to your next job.
                    </p>
                </div>
                <Image  width={700} height={350} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" property="true" src="/images/resignation-web.jpg" className="relative shadow-banner-img right-12 -bottom-28" alt="resignation"/>
            </div>
            <div className='min-h-screen bg-white py-20 flex  items-start md:px-8 px-2  justify-center flex-row'>
                <div className='bg-gray-100 w-1/4 py-4 table-content '>
                    <ol ref={olRef}>
                        <li className={activeSection === "understanding-the-decision-of-resigning"?'active-nav':''}><a href="#understanding-the-decision-of-resigning">Understanding the Decision of resigning</a></li>
                        <li className={activeSection === "how-to-resign-professionally"?'active-nav':''}><a href="#how-to-resign-professionally">How to resign professionally</a></li>
                        <li className={activeSection === "explain-resignation"?'active-nav':''}><a href="#explain-resignation">How to explain my resignation</a></li>
                        <li className={activeSection === "resignation-letter"?'active-nav':''}><a href="#resignation-letter">Resignation letter</a></li>
                        <li className={activeSection === "what's-next-after-i-resign"?'active-nav':''}><a href="#what's-next-after-i-resign">What's next after i resign</a></li>
                    </ol>
                </div>
                <div className='h-full mx-4  w-1/2 py-4' ref={ref}>
                    <InView onChange={setInView} threshold={0.4} id='understanding-the-decision-of-resigning'>
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

                    </InView>
                    
                    <InView onChange={setInView} threshold={0.4} id='how-to-resign-professionally'>
                            {({ ref }) => {
                                    return (<div ref={ref} className='flex-wrap blog-p' id='how-to-resign-professionally'>
                                                <h2 className='px-4 mx-2 py-2 text-3xl font-semibold'>How to resign professionally</h2>
                                                <p>You'll likely need to explain why you're resigning. Your boss will want to know why you're leaving, and potential employers will be curious about your reasons for seeking new opportunities. It's important to be respectful when discussing your decision to leave your current position. Doing so will help you maintain positive relationships with your soon-to-be former employer.</p>
                                                <p>When you choose to resign, it's important to speak with your manager in person if you can. If that's not possible because of distance, you can call them instead. It's better not to use email, even if your manager is away and can't be reached by phone. There should be someone else acting in their role who you can resign to face-to-face or by phone</p>
                                                <p>Make sure to inform your soon-to-be former employer in advance and help smooth the transition. Try to give them at least a few weeks' notice. Check your contract for any required notice period. And before committing to a start date for your new job, ensure you've agreed on a suitable transition period.</p>
                                            </div>)
                             }}
                    </InView>
                    <InView onChange={setInView} threshold={0.4} id='explain-resignation'>
                        {({ ref }) => {
                                    return (<div ref={ref} className='flex-wrap blog-p' id='explain-resignation'>
                                <h2 className='px-4 mx-2 py-2 text-3xl font-semibold'>How to explain my resignation?</h2>
                                <p>Arrange a meeting with your manager and be prepared to explain why you're resigning, choose a suitable time and place and make sure you are prepared for any questions or concerns. Start smoothly, there’s a good chance your employer may have already an idea of what you're going to say.</p>
                                <p>You should know that even if your reasons for leaving aren't ideal, resigning on a positive note is still advantageous. Show appreciation for your coworkers and mention the enjoyable aspects of your time there. During your meeting, discuss the skills and knowledge you've acquired. Express gratitude to your manager for their support and guidance, underscoring your appreciation for the opportunities you've had while indicating your readiness for a new chapter.</p>
                                <p>In your meeting with the manager, make sure to have a well-written resignation letter with you. Show professionalism and gratitude towards your current employer in the letter. Expressing appreciation for the opportunities and experiences gained during your time there shows maturity and leaves a positive impression on colleagues and supervisors.</p>
                            </div> )
                        }}
                    </InView>
                    <InView onChange={setInView} threshold={0.4} id="resignation-letter">
                        {({ ref }) => {
                            return (<div ref={ref} className='flex-wrap blog-p' id='resignation-letter'>
                                        <h2 className='px-4 mx-2 py-2 text-3xl font-semibold'>Resignation letter</h2>
                                        <p>A letter of resignation serves as a legal document specifying the date you intend for your notice period to begin. It signifies your decision to leave your job. You have the option to use either a resignation letter or email to formally inform your current company of your departure.</p>
                                        <p> it provides clear indication of your intention to leave, ensuring that there is no ambiguity regarding your departure date or reasons for leaving. This can be particularly helpful when applying for new jobs or seeking references in the future.</p>
                                        <h5 className='px-4 mx-2'>A professional letter of resignation must have these sections:</h5>
                                        <ul>
                                            <li>Header</li>
                                            <li>Greeting</li>
                                            <li>Opening paragraph</li>
                                            <li>Body paragraph(s)</li>
                                            <li>Closing paragraph</li>
                                            <li>Signature/enclosures</li>
                                        </ul>
                                        <p><span className='font-semibold'>Header: </span>it goes at the top of your cover letter. Here, you include your name and contact details, such as your phone number and work email.</p>
                                        <p><span className='font-semibold'>Greeting: </span>Address the person who will read your cover letter, like the hiring manager or boss you might have.</p>
                                        <p><span className='font-semibold'>Opening paragraph: </span>The first part of your resignation letter is super important because it shows your attitude towards resigning. It's crucial to handle this section carefully and professionally. Be sure to thank your employer for the opportunities you've had while explaining that you're ready for new opportunities.</p>
                                        <p><span className='font-semibold'>Body paragraph(s): </span> In this part, write one or two short paragraphs about what you've achieved in your career. Be sure to thank your manager for their support and say you've liked your job a lot. But explain that now you're ready for a new role.</p>
                                        <p><span className='font-semibold'>Closing paragraph: </span>In this part, thank the reader for their time. Also, let them know how much notice you're giving before leaving and offer to help during the transition.</p>
                                        <p><span className='font-semibold'>Signature/enclosures: </span> At the end of your letter, use a professional closing and then write your name. Also, mention if you're including any extra documents with your application.</p>
                                        <p>An effective resignation letter is is one that is professional, concise , and expresses appreciation for the company and colleagues. It should clearly state your intention to resign and specify the date you'll be leaving.</p>
                                        <p>A sample for a letter of resignation can be downloaded from <a className='text-blue-600 visited:text-purple-600' href='/uploads/resignation.docx' download="cv.docx">Here</a>.</p>
                                        <br/>
                                    </div>)
                        }}
                    </InView>
                    
                    <InView onChange={setInView} threshold={0.5} id="what's-next-after-i-resign">
                        {({ ref }) => {
                            return (<div ref={ref} className='flex-wrap blog-p' id="what's-next-after-i-resign">
                                        <h2 className='px-4 mx-2 py-2 text-3xl font-semibold'>What's next after i resign</h2>
                                        <p>Once you've resigned, you might be unsure how to spend your time during your notice period. The most important thing is to leave on a good note - this time will shape how the company remembers you.</p>
                                        <p>Get set for a brighter, more fulfilling future. Take the first step on your new journey by reaching out to recruiters who are searching for candidates with your skills.</p>
                                    </div>)
                        }}
                    </InView>
                </div>
            </div>
       </>

    )
} 


