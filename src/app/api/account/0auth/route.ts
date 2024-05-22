import User from "@/models/User";
import { NextApiRequest } from "next"
import { NextRequest, NextResponse } from "next/server"
import { IronSession, getIronSession } from 'iron-session';
import { OAuth2Client } from 'google-auth-library';
import { verifyGoogleToken } from "@/lib/helpers";
import cryptoRandomString from 'crypto-random-string';
import { cookies } from 'next/headers'
import { SessionData, sessionOptions } from "@/lib/session";








export const GET = async (req:  Request | NextRequest) =>{
    const query = new URL(req.url||'')
    const code = query.searchParams.get('code')||''

    const redirectURL = "http://localhost:3000/api/account/oauth"
    const oAuth2Client = new OAuth2Client(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        redirectURL
    );

    const r =  await oAuth2Client.getToken(code);
 
    oAuth2Client.setCredentials(r.tokens);

    const user = oAuth2Client.credentials;
    
    const googleUser = await verifyGoogleToken(user.id_token||'')
    
    if(googleUser.error){
        return NextResponse.json({success:false, message:googleUser.error},{status:500})
    }

    const key = cryptoRandomString({length: 50, type: 'base64'});
    const securedData = {apiKey:key,access_token:user.access_token,refresh_token:user.refresh_token,provider:'google'}

    const userId = googleUser.sub
    console.log('userID:',userId)
    const session = await getIronSession<SessionData>(cookies(), sessionOptions)
    session.data  = securedData 

    await session.save();



    return NextResponse.redirect('http://localhost:3000/',{status:370})


}