import { Category } from "@/models/Category";
import { NextRequest, NextResponse } from "next/server";
import ConnectDB from "@/DB";

export type ApiHandler = (req: Request | NextRequest) => Promise<Response | NextResponse> | Response | NextResponse;

export const GET: ApiHandler =  async (req) => {
    await ConnectDB();
    const options = {
        allowDiskUse: false,
        };
        const pipeline = [
        {
          $lookup: {
            from: "subCategories",
            localField: "subCategories",
            pipeline: [
              {
                $project: {
                  _id: "$_id",
                  title: "$title",
                  slug: "$slug",
                  code: "$code",
                },
              },
            ],
            foreignField: "_id",
            as: "subcategories",
          },
        },
        {
          $project: {
            _id: "$_id",
            title: "$title",
            slug: "$slug",
            code: "$code",
            subcategories: "$subcategories",
          },
        }];
    

        try { 
            const categories = await Category.aggregate(pipeline).option(options);
            return NextResponse.json({success:true,categories},{status:200})
        } catch (error) {

            return NextResponse.json({success:false,categories:[],message:'error while retreiving data'},{status:500})
        }
};


