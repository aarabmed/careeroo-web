import { NextRequest, NextResponse } from "next/server";

export type ApiHandler = (req: Request | NextRequest) => Promise<Response | NextResponse> | Response | NextResponse;

export const GET: ApiHandler = (req) => {
    console.log('hlllo')
    //return NextResponse.json("hi, you've surfed to a sync api route");
    return NextResponse.redirect('http://localhost:3000/')
};