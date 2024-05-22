import User from "@/models/User";
import { NextApiRequest } from "next"
import { NextRequest, NextResponse } from "next/server"

import { OAuth2Client } from 'google-auth-library';



export const POST = async (req: Request | NextRequest) =>{
    
    const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
    const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL;
    const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
    const state = "some_state";
    const GOOGLE_OAUTH_SCOPES = [
        "https://www.googleapis.com/auth/userinfo.email",      
        "https://www.googleapis.com/auth/userinfo.profile",
        
    ];
    const scopes = GOOGLE_OAUTH_SCOPES.join(" ");

    const oAuth2Client = new OAuth2Client(
        GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET,
        GOOGLE_CALLBACK_URL
    );

    // Generate the url that will be used for the consent dialog.

    try {
        
        const authorizeUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: scopes,
            prompt: 'consent',
            state:state
        });
    
    
        
        return NextResponse.json({success:true, url:authorizeUrl},{status:200}) 
    } catch (error) {
        
        return NextResponse.json({success:false,url:''},{status:500})
    }
}