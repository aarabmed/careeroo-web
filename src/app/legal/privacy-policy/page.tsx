'use client'
import React, { useEffect, useState } from 'react'





export default function Page() {
    


    return (

        <div className='flex-1'>
            <div className='w-full min-h-screen bg-gray-100 py-20 flex items-center md:px-8 px-2  justify-center flex-col'>
                <h1 className='px-4 mx-2 py-2 uppercase tracking-wider border-b-2 border-b-indigo-600 text-3xl font-semibold'>Privacy Policy</h1>
                <div className='w-2/3 h-full flex justify-center mt-8 items-start flex-col px-16 py-10 bg-white'>
                    <p className='leading-relaxed mb-8'>M-TEC  built the Careeroo app as a free and ad-supported. This page is used to inform visitors regarding our policies with the collection, use, and disclosure of Personal Information if anyone decided to use our Service.</p>
                    <p className='leading-relaxed mb-6'>If you choose to use our Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that We collect is used for providing and improving the Service.<br/>We will not use or share your information with anyone except as described in this Privacy Policy.</p>
                    <p className='leading-relaxed mb-8'>The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which are accessible at Careeroo unless otherwise defined in this Privacy Policy.</p>
                    <h2 className='font-semibold text-2xl'>Information Collection and Use:</h2>
                    <p className='leading-relaxed mb-6 mt-2'>For a better experience, while using our Service, We may require you to provide us with certain personally identifiable information. The information that We request will be retained by us and used as described in this privacy policy.</p>
                    <p className='leading-relaxed mb-2'>The app does use third-party services that may collect information used to identify you.</p>
                    <p className='leading-relaxed mb-2'>Link to the privacy policy of third-party service providers used by the app :</p>
                    <ol className='mb-8 ml-4'>
                        <li className='square-list'>Google Play Services</li>
                        <li className='square-list'>Google AdMob</li>
                        <li className='square-list'>Google Analytics</li>
                        <li className='square-list'>Google AdSense</li>
                        <li className='square-list'>Google Analytics for Firebase</li>
                        <li className='square-list'>Expo</li>
                    </ol>
                    <h2 className='font-semibold text-2xl'>Personal Data:</h2>
                    <p className='leading-relaxed mb-2'>While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. <br/>Personally identifiable information may include:</p>
                    <ol className='mb-8 ml-4'>
                        <li className='square-list'>Device Information: We collect information about the device you use to access our Services, including information about the device’s software and hardware, Media Access Control (“MAC”) address and other unique device identifiers, device token, mobile network information and time zone. </li>
                        <li className='square-list'>Usage Data</li>
                    </ol>
                    <h2 className='font-semibold text-2xl'>Log Data:</h2>
                    <p className='leading-relaxed mb-8'>We want to inform you that whenever you use our Service, in a case of an error in the app We collect data and information (through third-party products) on your phone called Log Data. This Log Data may include information such as your device Internet Protocol (“IP”) address, device name, operating system version, the configuration of the app when utilizing our Service, the time and date of your use of the Service, and other statistics.</p>
                    <h2 className='font-semibold text-2xl'>Security:</h2>
                    <p className='leading-relaxed mb-2'>We may employ third-party companies and individuals due to the following reasons:</p>
                    <ol className='mb-6 ml-4'>
                        <li className='square-list'>To facilitate our Service;</li>
                        <li className='square-list'>To provide the Service on our behalf;</li>
                        <li className='square-list'>To perform Service-related tasks; or</li>
                        <li className='square-list'>To assist us in analyzing how our Service is used.</li>
                    </ol>

                    <p className='leading-relaxed mb-8'>We want to inform users of this Service that these third parties have access to your Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.</p>
                    
                    <h2 className='font-semibold text-2xl'>Security:</h2>
                    <p className='leading-relaxed mb-8'>We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and We cannot guarantee its absolute security.</p>
                    
                    <h2 className='font-semibold text-2xl'>Links to Other Sites:</h2>
                    <p className='leading-relaxed mb-8'>This Service may contain links to other sites, companies or individuals . If you click on a third-party link, you will be directed to. Note that these external links are not operated by us. Therefore, We strongly advise you to review the Privacy Policy of these websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.</p>
                    
                    <h2 className='font-semibold text-2xl'>Children’s Privacy</h2>
                    <p className='leading-relaxed mb-8'>These Services do not address anyone under the age of 13. we do not knowingly collect personally identifiable information from children under 13 years of age. In the case we discover that a child under 13 has provided us with personal information, we immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us at <a className='text-blue-500' href="mailto:support@careeroo.io">support@careeroo.io</a> so that we will be able to do the necessary actions.</p>


                    <h2 className='font-semibold text-2xl'>Changes to This Privacy Policy</h2>
                    <p className='leading-relaxed mb-8'>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
                    <p className='leading-relaxed mb-8'>This policy is effective as of 2024-02-15</p>
               
                    <h2 className='font-semibold text-2xl'>Contact Us</h2>
                    <p className='leading-relaxed mb-8'>If you have any questions about this Privacy Policy, the data we collect, or have any other questions, please contact us at <a className='text-blue-500' href="mailto:support@careeroo.io">support@careeroo.io</a></p>
                    
                </div>
            </div> 
        </div>

    )
}

