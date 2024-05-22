
import {Article} from "@/models/Article";
import { NextRequest, NextResponse } from "next/server";
import { getPagination, isEmpty, matchStage, sortStage } from "@/lib/helpers";
export type ApiHandler = (req: Request | NextRequest) => Promise<Response | NextResponse> | Response | NextResponse;


type sanitizeQuery = {isValid:boolean,escapedQ:string}
function checkMinimumThreeCharacters(string:string):sanitizeQuery {
    // Remove special characters using regex
    var cleanedString = string.replace(/[-\/\\^$*+?._()|[\]{}]/g, '');

    // Check if cleaned string has at least 3 characters
    
    const isValid  = /\w{3,}/.test(cleanedString);

    return {escapedQ:cleanedString, isValid}
}

export const GET: ApiHandler = async (req) => {

    const query = new URL(req.url)

    console.log('platform:',query.searchParams.get('pf'))
    const pageRaw = query.searchParams.get('page') || 1
    const sizeRaw = query.searchParams.get('size') || 20

    const page = Number(pageRaw);
    const size = Number(sizeRaw);

    const q = query.searchParams.get('q')||''
    const { limit, offset } = getPagination(page, size);

    const {isValid,escapedQ } = checkMinimumThreeCharacters(q)

    /* if (!isValid) {
        return NextResponse.json({
            success:true,
            articles: [],
            currentPage: 0,
            hasNextPage: false,
            hadPreviousPage: false,
            totalPages: null,
            prevPage: null,
            nextPage: null,
            numberResults: 0,
            
        },
        {status:200})
    } */

    

   
    const Match = await matchStage(query);
    const Sort = sortStage(query);

    

    const  pipeline:Array<any> = [
            Match,
            {
            $facet: {
                data: [
                Sort,
                {
                    $project: {
                    title: "$title",
                    date: "$date",
                    job_id: "$job_id",
                    location: "$city.value",
                    salaryType: "$salaryType",
                    business: "$business",
                    hourlySalary: "$Hsalary",
                    yearlySalary: "$Ysalary",
                    verified: "$verified",
                    negotiated: "$negotiated",
                    jobSalary: "$jobSalary",
                    platform: "$platform",
                    locations:"$location",
                    
                    },
                },
                {
                    $skip: offset,
                },
                {
                    $limit: limit,
                },
                
                ],
                metadata: [
                {
                    $count: "total",
                },
                ],
            },
            },
            {
            $project: {
                data: 1.0,
                totalPages: {
                $ceil: {
                    $divide: [
                    {
                        $arrayElemAt: ["$metadata.total", 0.0],
                    },
                    limit,
                    ],
                },
                },
                totalResults: "$metadata.total",
                currentPage: {
                $cond: [
                    {
                    $arrayElemAt: ["$metadata.total", 0.0],
                    },
                    {
                    $add: [
                        {
                        $divide: [offset, limit],
                        },
                        1.0,
                    ],
                    },
                    0.0,
                ],
                },
            },
            },
            {
            $project: {
                data: 1.0,
                totalPages: "$totalPages",
                currentPage: "$currentPage",
                hasNextPage: {
                $gt: ["$totalPages", "$currentPage"],
                },
                hadPreviousPage: {
                $and: [
                    {
                    $gt: ["$currentPage", 1.0],
                    },
                    {
                    $gte: ["$totalPages", "$currentPage"],
                    },
                ],
                },
                nextPage: {
                $cond: [
                    {
                    $or: [
                        {
                        $eq: ["$totalPages", "$currentPage"],
                        },
                        {
                        $gt: ["$currentPage", "$totalPages"],
                        },
                    ],
                    },
                    null,
                    {
                    $add: ["$currentPage", 1.0],
                    },
                ],
                },
                prevPage: {
                $cond: [
                    {
                    $and: [
                        {
                        $gt: ["$currentPage", 1.0],
                        },
                        {
                        $gte: ["$totalPages", "$currentPage"],
                        },
                    ],
                    },
                    {
                    $subtract: ["$currentPage", 1.0],
                    },
                    null,
                ],
                },
                numberResults: {
                $arrayElemAt: ["$totalResults", 0.0],
                },
            },
            }, 
        ];

    
    

    if (isValid) {
        pipeline.unshift({
            $search: {
                index: "title_index",
                autocomplete: {
                query: escapedQ,
                path: 'title'
                },
            },
        });
    }

    if (!isEmpty(Sort)) {
        pipeline.splice(2, 0, Sort);
    }

    var options = {
        allowDiskUse: true,
    };

    try {
        const results = await Article.aggregate(pipeline).option(options);
        return NextResponse.json({
            success:true,
            articles: results[0].data,
            currentPage: results[0].currentPage,
            hasNextPage: results[0].hasNextPage,
            hasPreviousPage: results[0].hadPreviousPage,
            totalPages: results[0].totalPages,
            prevPage: results[0].prevPage,
            nextPage: results[0].nextPage,
            numberResults: results[0].numberResults ? results[0].numberResults : 0,
        },{status:200})
        
    } catch (error) {
        return NextResponse.json({
            success:false,
            articles: [],
            currentPage: 0,
            hasNextPage: false,
            hadPreviousPage: false,
            totalPages: null,
            prevPage: null,
            nextPage: null,
            numberResults: 0,
            
        },
        {status:500})
    }
        

}