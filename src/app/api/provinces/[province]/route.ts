import {Article} from "@/models/Article";
import { NextRequest, NextResponse } from "next/server";
import ConnectDB from "@/DB";
import { PipelineStage } from "mongoose";

export type ApiHandler = (req: Request | NextRequest, { params }: { params: { province: string } }) => Promise<Response | NextResponse> | Response | NextResponse;

export const GET: ApiHandler = async (req, {params} ) => {
    await ConnectDB();
    const {province} = params
   
    const pipeline:Array<PipelineStage> = [
        {$match:{'city.value':{$regex:province.toUpperCase()}}},
        {$group:{_id:'$city.name'}},
        {$project:{'name':'$_id','_id':'$_id'}},
        {$sort:{'name':1}}
      ]

    try {
      const cities = await Article.aggregate(pipeline).allowDiskUse(true)      
      return NextResponse.json({
          success:true, 
          cities:cities,
      },{status:200})
    } catch (error) {
      return NextResponse.json({success:false,message:'error while retreiving data'},{status:500})
    }

};