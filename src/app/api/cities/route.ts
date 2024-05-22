import {Article} from "@/models/Article";
import { NextRequest, NextResponse } from "next/server";
import ConnectDB from "@/DB";

export type ApiHandler = (req: Request | NextRequest) => Promise<Response | NextResponse> | Response | NextResponse;

export const GET: ApiHandler = async (req) => {
    await ConnectDB();

    const query = new URL(req.url)
    const city = query.searchParams.get('city')||''
    const CityLength = new RegExp("^(?![-._])([a-zA-Z _.-]{2,})");

    if(!CityLength.test(city)){
        return NextResponse.json({success:true, cities:[]},{status:200})
    }

    const pipeline = [
        {
          $match:{$and:[
            {"city.name":{$regex:`^${city}`,$options:'i'}},
            {'sub':{$ne:null}},
            { "status": true },
            {'platform':{$ne:''}},
          ]}
        },
        {
          $group:{
            _id: "$city.name",
          }
        },
        {
          $group:{
            _id: null,
            cities:{$push:"$_id"}
          }
        },
        {
          $project:{
            'cities':true,'_id':false
          }
        }
    ]
    try {
      const data = await Article.aggregate(pipeline).option({allowDiskUse: true})
      console.log("data:",data)
   
  
      return NextResponse.json({
          success:true, 
          cities:data.length? data[0].cities :[],
      },{status:200})
    } catch (error) {
      return NextResponse.json({success:false,message:'error while retreiving data'},{status:500})
    }

};