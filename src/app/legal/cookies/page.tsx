'use client'
import React, { useEffect, useState } from 'react'





export default function Page() {
    


    return (

        <div className='flex-1'>
            <div className='w-full min-h-screen bg-gray-100 py-20 flex items-center md:px-8 px-2  justify-center flex-col'>
                <h1 className='px-4 mx-2 py-2 uppercase tracking-wider border-b-2 border-b-indigo-600 text-3xl font-semibold'>Cookies Policy</h1>
                <div className='w-2/3 h-full flex justify-center mt-8 items-start flex-col px-16 py-10 bg-white'>  
                    <h2 className='leading-relaxed font-semibold text-2xl'>Last updated: 27/05/2024 </h2>
                    <p className='leading-relaxed mb-6'>This Cookies Policy explains what cookies are and how we use them. You should read this policy so you can understand what type of cookies we use, the information we collect using cookies and how that information is used.</p>
                    
                    <h2 className='font-semibold text-2xl'>What are cookies?</h2>
                    <p className='leading-relaxed mb-6'>Cookies are small text files that are stored on your computer or mobile device when you visit a website. They allow the website to recognize your device and store some information about your preferences or past actions.</p>
                    
                    <h2 className='font-semibold text-2xl'>How do we use cookies?</h2>
                    <p className='leading-relaxed mb-6'>We use cookies to improve your browsing experience, to understand how you use our site, and to personalize content and advertisements. We may also use cookies to analyze our traffic.</p>
                    
                    <h2 className='font-semibold text-2xl'>Types of cookies we use</h2>
                    <ul className='mb-6'>
                        <li className='flex flex-col'><span className='text-slate-800' ><strong>Essential cookies:</strong></span><span >- These cookies are necessary for the website to function and cannot be switched off in our systems.</span></li>
                        <li className='flex flex-col'><span className='text-slate-800' ><strong>Performance cookies:</strong></span><span >- These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site.</span></li>
                        <li className='flex flex-col'><span className='text-slate-800' ><strong>Functional cookies:</strong></span><span >- These cookies enable the website to provide enhanced functionality and personalization.</span></li>
                        <li className='flex flex-col'><span className='text-slate-800' ><strong>Targeting cookies:</strong></span><span >- These cookies may be set through our site by our advertising partners to build a profile of your interests and show you relevant adverts on other sites.</span></li>
                    </ul>
                    
                    <h2 className='font-semibold text-2xl'>Your choices regarding cookies</h2>
                    <p className='leading-relaxed mb-6'>If you prefer to avoid the use of cookies on our website, you must first disable the use of cookies in your browser and then delete the cookies saved in your browser associated with this website. You may use this option for preventing the use of cookies at any time.</p>
                    <p className='leading-relaxed mb-6'>If you do not accept our cookies, you may experience some inconvenience in your use of the website and some features may not function properly.</p>
                    
                    <h2 className='font-semibold text-2xl'>Changes to this Cookies Policy</h2>
                    <p className='leading-relaxed mb-6'>We may update our Cookies Policy from time to time. We will notify you of any changes by posting the new Cookies Policy on this page.</p>
                    <p className='leading-relaxed mb-6'>You are advised to review this Cookies Policy periodically for any changes. Changes to this Cookies Policy are effective when they are posted on this page.</p>
                    
                    <h2 className='font-semibold text-2xl'>Contact us</h2>
                    <p className='leading-relaxed mb-6'>If you have any questions about this Cookies Policy, please contact us:</p>
                    <ul className='mb-6'>
                        <li>By email: [Your Email Address]</li>
                        <li>By visiting this page on our website: [Your Contact Page URL]</li>
                        <li>By phone number: [Your Phone Number]</li>
                    </ul>

                    <h2 className='font-semibold text-2xl'>
                        Cookies used on our website
                    </h2>
                    <h4 className='leading-relaxed text-slate-800 text-lg font-medium'>
                        Essential Cookies
                    </h4>
      
                    <table className='mb-8'>
                        <thead>
                            <tr>
                                <th scope="col"><strong>Cookie author</strong></th>
                                <th scope="col"><strong>Cookie name</strong></th>
                                <th scope="col"><strong>Purpose</strong></th>
                                <th scope="col"><strong>Duration</strong></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td data-label="Cookie author">IRON-SESSION</td>
                            <td data-label="Cookie name">AUTH-IRON-SESSION</td>
                            <td data-label="Purpose">The hard user session container data about loged in user such as apikey, refreash token ,access token, and does not require connection to a database to validate the users login session. This session identifies who the user is, This session is essential to maintaining a logged in state.</td>
                            <td data-label="Duration">7 days</td>
                            </tr>
                        </tbody>
                    </table>

                    <h4 className='leading-relaxed text-slate-800 text-lg font-medium'>
                        Targeting or Advertising Cookies (including ad measurement)
                    </h4>
                    <p className='leading-relaxed mb-6'>
                        The following cookies are set by our trusted third parties for the purposes of serving you advertisements away from our site.                   
                    </p>
                    <table>
                        <thead>
                            <tr>
                            <th scope="col"><strong>Cookie author</strong></th>
                            <th scope="col"><strong>Cookie name</strong></th>
                            <th scope="col"><strong>Purpose</strong></th>
                            <th scope="col"><strong>Duration</strong></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td data-label="Cookie author">Adaylser</td>
                            <td data-label="Cookie name">__adal_ca</td>
                            <td data-label="Purpose">These Adalyser (TV) cookies take a snapshot of web traffic around the time an advert is aired on television. These cookies allow us to effectively measure the resulting change in traffic volumes from our TV advertising to measure Ad effectiveness.</td>
                            <td data-label="Duration">6 months</td>
                            </tr>
                            <tr>
                            <td data-label="Cookie author">Adaylser</td>
                            <td data-label="Cookie name">__adal_cw</td>
                            <td data-label="Purpose">These Adalyser (TV) cookies take a snapshot of web traffic around the time an advert is aired on television. These cookies allow us to effectively measure the resulting change in traffic volumes from our TV advertising to measure Ad effectiveness.</td>
                            <td data-label="Duration">30 days</td>
                            </tr>
                            <tr>
                            <td data-label="Cookie author">Adaylser</td>
                            <td data-label="Cookie name">__adal_id</td>
                            <td data-label="Purpose">These Adalyser (TV) cookies take a snapshot of web traffic around the time an advert is aired on television. These cookies allow us to effectively measure the resulting change in traffic volumes from our TV advertising to measure Ad effectiveness.</td>
                            <td data-label="Duration">2 years</td>
                            </tr>
                            <tr>
                            <td data-label="Cookie author">Adaylser</td>
                            <td data-label="Cookie name">__adal_ses</td>
                            <td data-label="Purpose">These Adalyser (TV) cookies take a snapshot of web traffic around the time an advert is aired on television. These cookies allow us to effectively measure the resulting change in traffic volumes from our TV advertising to measure Ad effectiveness.</td>
                            <td data-label="Duration">session</td>
                            </tr>
                            <tr>
                            <td data-label="Cookie author">Google</td>
                            <td data-label="Cookie name">__gads</td>
                            <td data-label="Purpose">Advertising cookies (e.g., cookies named ‘__gads’ or ‘__gac’) may be set on the domain of the site you’re visiting. Unlike cookies that are set on Google’s own domains, these cookies can’t be read by Google when you’re on a site other than the one on which they were set. They serve purposes such as measuring interactions with the ads on that domain and preventing the same ads from being shown to you too many times.</td>
                            <td data-label="Duration">390 days</td>
                            </tr>
                            <tr>
                            <td data-label="Cookie author">Google</td>
                            <td data-label="Cookie name">_ga</td>
                            <td data-label="Purpose">Used to distinguish users.</td>
                            <td data-label="Duration">2 years</td>
                            </tr>
                            <tr>
                            <td data-label="Cookie author">Google</td>
                            <td data-label="Cookie name">_gid</td>
                            <td data-label="Purpose">Used to distinguish users.</td>
                            <td data-label="Duration">24  hours</td>
                            </tr>
                            <tr>
                            <td data-label="Cookie author">Google</td>
                            <td data-label="Cookie name">G_ENABLED_IDPS</td>
                            <td data-label="Purpose">Used for Google Single Sign On.</td>
                            <td data-label="Duration">Expires <br/>31/12/9999</td>
                            </tr>
                            <tr>
                            <td data-label="Cookie author">Google</td>
                            <td data-label="Cookie name">IDE</td>
                            <td data-label="Purpose">One of the main advertising cookies on non-Google sites is named ‘IDE‘ and is stored in browsers under the domain doubleclick.net.</td>
                            <td data-label="Duration">2 years</td>
                            </tr>
                            <tr>
                            <td data-label="Cookie author">Google</td>
                            <td data-label="Cookie name">NID</td>
                            <td data-label="Purpose">Google uses cookies like NID and SID to help customize ads on Google properties, like Google Search. For example, we use such cookies to remember your most recent searches, your previous interactions with an advertiser’s ads or search results, and your visits to an advertiser’s website. This helps us to show you customized ads on Google.</td>
                            <td data-label="Duration">6 months</td>
                            </tr>
                            <tr>
                            <td data-label="Cookie author">Google</td>
                            <td data-label="Cookie name">ANID</td>
                            <td data-label="Purpose">One of the main advertising cookies stored in google.com is called ANID. We use other cookies with names such as DSID, FLC, AID, TAID, and exchange_uid. Other Google properties, like YouTube, may also use these cookies to show you more relevant ads.</td>
                            <td data-label="Duration">12 months</td>
                            </tr>
                            <tr>
                            <td data-label="Cookie author">Google</td>
                            <td data-label="Cookie name">OTZ</td>
                            <td data-label="Purpose">A cookie used by Google Analytics that provides an aggregate analysis of Website visitors.</td>
                            <td data-label="Duration">1 month</td>
                            </tr>
                            <tr>
                            <td data-label="Cookie author">Google</td>
                            <td data-label="Cookie name">UULE</td>
                            <td data-label="Purpose">These cookies are used to collect information about how visitors use our Site. We use the information to compile reports and to help us improve the Site. The cookies collect information in an anonymous form, including the number of visitors to the Site, where visitors have come to the Site from and the pages they visited. If you do not allow these cookies we will not be able to include your visit in our statistics. You can read the full Google Analytics privacy policy at: <a href="http://www.google.com/policies/privacy/" style={{color:'blue', textDecoration:'underline'}}>http://www.google.com/policies/privacy/</a>.</td>
                            <td data-label="Duration">6 hours</td>
                            </tr>
                            <tr>
                            <td data-label="Cookie author">Facebook</td>
                            <td data-label="Cookie name">_fbp</td>
                            <td data-label="Purpose">When the Facebook pixel is installed on a website, and the pixel uses first-party cookies, the pixel automatically saves a unique identifier to an _fbp cookie for the website domain if one does not already exist.</td>
                            <td data-label="Duration">90 days</td>
                            </tr>
                            <tr>
                            <td data-label="Cookie author">Facebook</td>
                            <td data-label="Cookie name">fr</td>
                            <td data-label="Purpose">This cookie is used to deliver, measure and improve the relevancy of ads, with a lifespan of 90 days.</td>
                            <td data-label="Duration">90 days</td>
                            </tr>
                            <tr>
                            <td data-label="Cookie author">Verizon</td>
                            <td data-label="Cookie name">A3</td>
                            <td data-label="Purpose">Used to track the post-click experience of users coming to Totaljobs via Verizon advertisements and enable Totaljobs to understand which audience segments are best to target for Totaljobs.</td>
                            <td data-label="Duration">12 months</td>
                            </tr>
                            <tr>
                            <td data-label="Cookie author">Microsoft</td>
                            <td data-label="Cookie name">ANON</td>
                            <td data-label="Purpose">Contains the ANID, a unique identifier derived from your Microsoft account, which is used for advertising, personalisation, and operational purposes. It is also used to preserve your choice to opt out of interest-based advertising from Microsoft if you have chosen to associate the opt-out with your Microsoft account.</td>
                            <td data-label="Duration">6 months</td>
                            </tr>
                            <tr>
                            <td data-label="Cookie author">Microsoft</td>
                            <td data-label="Cookie name">MUID</td>
                            <td data-label="Purpose">Microsoft Advertising uses the Microsoft User Identifier (MUID) to help count valid clicks.</td>
                            <td data-label="Duration">390 days</td>
                            </tr>
                            <tr>
                            <td data-label="Cookie author">Microsoft</td>
                            <td data-label="Cookie name">NAP</td>
                            <td data-label="Purpose">Contains an encrypted version of your country, postcode, age, gender, language and occupation, if known, based on your Microsoft account profile.</td>
                            <td data-label="Duration">99 days</td>
                            </tr>
                            <tr>
                            <td data-label="Cookie author">Microsoft</td>
                            <td data-label="Cookie name">_uetsid</td>
                            <td data-label="Purpose">This cookie is used by Bing to determine what ads should be shown that may be relevant to the end user perusing the site.</td>
                            <td data-label="Duration">1 day</td>
                            </tr>
                            <tr>
                            <td data-label="Cookie author">Microsoft</td>
                            <td data-label="Cookie name">_uetvid</td>
                            <td data-label="Purpose">A unique, anonymized visitor ID, assigned by UET, representing a unique visitor. UET stores this data in a first-party cookie named &quot;_uetvid&quot;.</td>
                            <td data-label="Duration">18 days</td>
                            </tr>
                            <tr>
                            <td data-label="Cookie author">Lotame</td>
                            <td data-label="Cookie name">_cc_aud</td>
                            <td data-label="Purpose">_cc_aud collects and stores Lotame audience data.</td>
                            <td data-label="Duration">269 days</td>
                            </tr>
                            <tr>
                            <td data-label="Cookie author">Lotame</td>
                            <td data-label="Cookie name">_cc_cc</td>
                            <td data-label="Purpose">_cc_cc collects anonymous user session data related to the user’s website visits, such as the number of visits, average time spent on the website and what pages have been loaded.</td>
                            <td data-label="Duration">269 days</td>
                            </tr>    <tr>
                            <td data-label="Cookie author">Lotame</td>
                            <td data-label="Cookie name">_cc_dc</td>
                            <td data-label="Purpose">_cc_dc collects and stores anonymous statistical data related to the user’s website visits, such as the number of visits, average time spent on the website and what pages have been loaded.</td>
                            <td data-label="Duration">269 days</td>
                            </tr>    
                            <tr>
                            <td data-label="Cookie author">Lotame</td>
                            <td data-label="Cookie name">_cc_id</td>
                            <td data-label="Purpose">_cc_id is a Lotame persistent unique user identifier.</td>
                            <td data-label="Duration">269 days</td>
                            </tr>
                            <tr>
                            <td data-label="Cookie author">Awin</td>
                            <td data-label="Cookie name">aw21134</td>
                            <td data-label="Purpose">Set when you click on one of our links. Stores IDs for referring website, advertisement on which you clicked, group of advertisements to which the advertisement belongs, time you clicked on it, ID for the type of advertisement, ID for the product and any reference the referring site adds to the click.</td>
                            <td data-label="Duration">30 days</td>
                            </tr>
                            <tr>
                            <td data-label="Cookie author">Awin</td>
                            <td data-label="Cookie name">bId</td>
                            <td data-label="Purpose">Sets a browser-specific ID to identify a new click on the same browser. Cookie expires after one year.</td>
                            <td data-label="Duration">1 year</td>
                            </tr>
                            <tr>
                            <td data-label="Cookie author">Adobe Audience Manager</td>
                            <td data-label="Cookie name">demdex</td>
                            <td data-label="Purpose">Audience Manager sets the demdex cookie to assign a unique ID to a site visitor. The demdex cookie helps Audience Manger perform basic functions such as visitor identification, ID synchronization, segmentation, modeling, reporting, etc.</td>
                            <td data-label="Duration">180 days</td>
                            </tr>
                            <tr>
                            <td data-label="Cookie author">Adobe Audience Manager</td>
                            <td data-label="Cookie name">dpm</td>
                            <td data-label="Purpose">DPM is an abbreviation for Data Provider Match. It tells internal, Adobe systems that a call from Audience Manager or the Adobe Experience Cloud ID Service is passing in customer data for synchronization or requesting an ID. This is the most common demdex.net call you’ll see from Audience Manager or the Adobe Experience Cloud ID Service.</td>
                            <td data-label="Duration">180 days</td>
                            </tr>
                            <tr>
                            <td data-label="Cookie author">Twitter</td>
                            <td data-label="Cookie name">guest_id</td>
                            <td data-label="Purpose">This domain is owned by Twitter. The main business activity is: Social Networking Services.  Where Twitter acts as a third party host, it collects data through a range of plug-ins and integrations, that is primarily used for tracking and targeting.</td>
                            <td data-label="Duration">879 days</td>
                            </tr>
                            <tr>
                            <td data-label="Cookie author">Twitter</td>
                            <td data-label="Cookie name">personalization_id</td>
                            <td data-label="Purpose">This domain is owned by Twitter. The main business activity is: Social Networking Services.  Where twitter acts as a third party host, it collects data through a range of plug-ins and integrations, that is primarily used for tracking and targeting.</td>
                            <td data-label="Duration">730 days</td>
                            </tr>
                            <tr>
                            <td data-label="Cookie author">Bombora</td>
                            <td data-label="Cookie name">pi</td>
                            <td data-label="Purpose">pi is the Bombora cookie ID which is stored for 1 year and allows us to aggregate behaviour data under a single device profile.</td>
                            <td data-label="Duration">1 year</td>
                            </tr>
                            <tr>
                            <td data-label="Cookie author">Bombora</td>
                            <td data-label="Cookie name">tp</td>
                            <td data-label="Purpose">tp is a temporary cookie stored for 24 hours to assist with daily unique user counting.</td>
                            <td data-label="Duration">24 hours</td>
                            </tr>
                            <tr>
                            <td data-label="Cookie author">Bombora</td>
                            <td data-label="Cookie name">u</td>
                            <td data-label="Purpose">u is a temporary cookie stored for 15 seconds that helps us with unique page view counting.</td>
                            <td data-label="Duration">15 seconds</td>
                            </tr>
                            <tr>
                            <td data-label="Cookie author">Trade Desk</td>
                            <td data-label="Cookie name">TDCPM</td>
                            <td data-label="Purpose">Trade desk cookie partner mapping: It contains data denoting whether a cookie ID is synced with our partners. ID syncing enables our partners to use their data from outside our trading platform on the platform.</td>
                            <td data-label="Duration">1 year</td>
                            </tr>
                            <tr>
                            <td data-label="Cookie author">Other</td>
                            <td data-label="Cookie name">TealiumCampaignPersist</td>
                            <td data-label="Purpose">Used to store the latest marketing campaign code so that we can optimise based on traffic channels.</td>
                            <td data-label="Duration">Session</td>
                            </tr>
                            <tr>
                            <td data-label="Cookie author">Tealium</td>
                            <td data-label="Cookie name">TDID</td>
                            <td data-label="Purpose">Trade Desk write an ID called TDID into the top-level cookie in the Adserver.org domain and its sister ad-serving domain Adsrvr.org along with the metadata describing the status of mapping that cookie to partners. In H2 2017, TTD started making the TDID available for other parties to use it as their primary ID to better reflect the collaborative intent of the domain. The implementation is identical, and TTD continues to own and operate the domain. It is a Google AdX-approved fourth-party domain, it is included in the National Advertising Initiative (NAI) optout tool, and it has a privacy policy to which all adopters must adhere.</td>
                            <td data-label="Duration">1 year</td>
                            </tr>
                            <tr>
                            <td data-label="Cookie author">Xandr</td>
                            <td data-label="Cookie name">anj</td>
                            <td data-label="Purpose">This cookie contains data denoting whether a cookie ID is synced with our partners.ID syncing enables our partners to use their data from outside the Platform on the Platform. (See our platform privacy page for more info.)</td>
                            <td data-label="Duration">90 days</td>
                            </tr>
                            <tr>
                            <td data-label="Cookie author">Xandr</td>
                            <td data-label="Cookie name">uids</td>
                            <td data-label="Purpose">The uids cookie contains a base 64 encoded JSON object which contains external unique randomly-generated values that enable other Prebid Server demand partners to distinguish browsers and mobile devices. This information is used by our Prebid Server demand partners to select advertisements for delivery by the Platform and to measure the performance of, and attribute payment for, those advertisements. Note the cookie is a cookie used by prebid.org, the open source heading bidding project and is not our proprietary cookie.  We run an instance of prebid.org software on our infrastructure.</td>
                            <td data-label="Duration">90 days</td>
                            </tr>
                            <tr>
                            <td data-label="Cookie author">Xandr</td>
                            <td data-label="Cookie name">usersync</td>
                            <td data-label="Purpose">The usersync cookie contains data denoting whether a cookie ID is synced with our partners. ID syncing enables our partners to use their data from outside the Platform on the Platform. (See our platform privacy page for more info.)</td>
                            <td data-label="Duration">90 days</td>
                            </tr>
                            <tr>
                            <td data-label="Cookie author">Xandr</td>
                            <td data-label="Cookie name">tcs.adnxs_uid</td>
                            <td data-label="Purpose">Xandr Cookie Matching Service (formerly AppNexus) enables a buyer to associate the cookie that identifies a Tealium visitor and the cookie that identifies the user for Xandr.</td>
                            <td data-label="Duration">6 months</td>
                            </tr>
                            <tr>
                            <td data-label="Cookie author">Xandr</td>
                            <td data-label="Cookie name">icu</td>
                            <td data-label="Purpose">The icu cookie is used to select ads and limit the number of times a user sees a particular ad. <br/>It contains information such as the number of times an ad has been shown, how recently an ad has been shown, or how many total ads have been shown.</td>
                            <td data-label="Duration">90 days</td>
                            </tr>
                            <tr>
                            <td data-label="Cookie author">Xandr</td>
                            <td data-label="Cookie name">uuid2</td>
                            <td data-label="Purpose">This cookie contains a unique randomly-generated value that enables the Platform to distinguish browsers and devices.</td>
                            <td data-label="Duration">90 days</td>
                            </tr>
                            <tr>
                            <td data-label="Cookie author">Mediamath</td>
                            <td data-label="Cookie name">uuid</td>
                            <td data-label="Purpose">In order for a data provider to send audience data to MediaMath, there must be a user sync process in place. This means that the provider can refer to a user by a MediaMath Unique User ID (MM UUID).</td>
                            <td data-label="Duration">13 months</td>
                            </tr>
                            <tr>
                            <td data-label="Cookie author">Lead Forensics</td>
                            <td data-label="Cookie name">Lfuuid</td>
                            <td data-label="Purpose">The _lfuuid cookie allows a website to track visitor behaviour on the sites on which the cookie is installed. Tracking is performed anonymously until a user identifies himself by submitting a form.</td>
                            <td data-label="Duration">Expires <br/>01/02/2030</td>
                            </tr>
                            <tr>
                            <td data-label="Cookie author">Selligent</td>
                            <td data-label="Cookie name">Sbt_i</td>
                            <td data-label="Purpose">Unique site identifier</td>
                            <td data-label="Duration">1 year</td>
                            </tr>
                            <tr>
                            <td data-label="Cookie author">Selligent</td>
                            <td data-label="Cookie name">Sbt_p</td>
                            <td data-label="Purpose">This tracks users behavior on the website which can trigger Selligent landing pages (for example show banners) or email campaigns (example: abandoned basket email). <br/>And the cookie specifically keeps the information to link back to the behavior</td>
                            <td data-label="Duration">1 year</td>
                            </tr>
                            <tr>
                            <td data-label="Cookie author">Other</td>
                            <td data-label="Cookie name">UULE</td>
                            <td data-label="Purpose">These cookies are used to collect information about how visitors use our Site. We use the information to compile reports and to help us improve the Site. The cookies collect information in an anonymous form, including the number of visitors to the Site, where visitors have come to the Site from and the pages they visited. If you do not allow these cookies we will not be able to include your visit in our statistics. You can read the full Google Analytics privacy policy at: <a href="http://www.google.com/policies/privacy/" style={{color:'blue', textDecoration:'underline' }}>http://www.google.com/policies/privacy/</a></td>
                            <td data-label="Duration">6 hours</td>
                            </tr>
                            <tr>
                            <td data-label="Cookie author">Criteo</td>
                            <td data-label="Cookie name">uid</td>
                            <td data-label="Purpose">Identifier of a Criteo cookie that we have assigned to your web browser</td>
                            <td data-label="Duration">13 months</td>
                            </tr>
                            <tr>
                            <td data-label="Cookie author">LinkedIn</td>
                            <td data-label="Cookie name">UserMatchHistory</td>
                            <td data-label="Purpose">LinkedIn Ads ID syncing</td>
                            <td data-label="Duration">30 days</td>
                            </tr>
                            <tr>
                            <td data-label="Cookie author">LinkedIn</td>
                            <td data-label="Cookie name">AnalyticsSyncHistory</td>
                            <td data-label="Purpose">Used to store information about the time a sync with the lms_analytics cookie took place for users in the Designated Countries</td>
                            <td data-label="Duration">30 days</td>
                            </tr>
                            <tr>
                            <td data-label="Cookie author">LinkedIn</td>
                            <td data-label="Cookie name">li_oatml</td>
                            <td data-label="Purpose">Used to identify LinkedIn Members off LinkedIn for advertising and analytics outside the Designated Countries and, for a limited time, advertising in the Designated Countries</td>
                            <td data-label="Duration">30 days</td>
                            </tr>
                            <tr>
                            <td data-label="Cookie author">LinkedIn</td>
                            <td data-label="Cookie name">lms_ads</td>
                            <td data-label="Purpose">Used to identify LinkedIn Members off LinkedIn in the Designated Countries for advertising</td>
                            <td data-label="Duration">30 days</td>
                            </tr>
                            <tr>
                            <td data-label="Cookie author">LinkedIn</td>
                            <td data-label="Cookie name">lms_analytics</td>
                            <td data-label="Purpose">Used to identify LinkedIn Members in the Designated Countries for analytics</td>
                            <td data-label="Duration">30 days</td>
                            </tr>
                            <tr>
                            <td data-label="Cookie author">LinkedIn</td>
                            <td data-label="Cookie name">li_fat_id</td>
                            <td data-label="Purpose">Member indirect identifier for Members for conversion tracking, retargeting, analytics</td>
                            <td data-label="Duration">30 days</td>
                            </tr>
                            <tr>
                            <td data-label="Cookie author">LinkedIn</td>
                            <td data-label="Cookie name">li_sugr</td>
                            <td data-label="Purpose">Used to make a probabilistic match of a user&apos;s identity outside the Designated Countries</td>
                            <td data-label="Duration">90 days</td>
                            </tr>
                            <tr>
                            <td data-label="Cookie author">LinkedIn</td>
                            <td data-label="Cookie name">U</td>
                            <td data-label="Purpose">Browser Identifier for users outside the Designated Countries</td>
                            <td data-label="Duration">3 months</td>
                            </tr>
                            <tr>
                            <td data-label="Cookie author">LinkedIn</td>
                            <td data-label="Cookie name">_guid</td>
                            <td data-label="Purpose">Used to identify a LinkedIn Member for advertising through Google Ads</td>
                            <td data-label="Duration">90 days</td>
                            </tr>
                            <tr>
                            <td data-label="Cookie author">LinkedIn</td>
                            <td data-label="Cookie name">BizographicsOptOut</td>
                            <td data-label="Purpose">Determine opt-out status for 3rd party tracking</td>
                            <td data-label="Duration">10 years</td>
                            </tr>
                        </tbody>
                    </table>
     
                </div>
            </div> 
        </div>

    )
}

