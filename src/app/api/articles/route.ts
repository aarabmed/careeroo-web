import { ObjectId, getPagination, isValidID, matchStage, sortStage } from "@/lib/helpers";
import {Article} from "@/models/Article";
import { AggregateOptions, PipelineStage } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import ConnectDB from "@/DB";

export type ApiHandler = (req: Request | NextRequest) => Promise<Response | NextResponse> | Response | NextResponse;
const options:AggregateOptions = {
    allowDiskUse: true,
};


export type ARTICLE_RES = {
    data: any;
    status: number;
}

export const GET: ApiHandler = async (req) => {

    await ConnectDB();

    const query = new URL(req.url)
    const id = query.searchParams.get('id')
    if(id){
        console.log('id:::',id)
       const {data,status} = await getSingleArticle(id)
    
       return NextResponse.json(data,{status:status})
    }

    const {data,status} = await getAllArticles(query)
    return NextResponse.json(data,{status:status})

};


const getAllArticles = async (query:URL):Promise<ARTICLE_RES>=>{
    let response = {data:{},status:404}
    const page = Number(query.searchParams.get('page')) || 1;
    const size = Number(query.searchParams.get('size')) || 15;
    const { limit, offset } = getPagination(page, size);


    
    const Sort =  sortStage(query);
    const Match = await matchStage(query);
    
    const pipeline:Array<any> = [
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
                business: "$business",
                salaryType: "$salaryType",
                yearlySalary: "$Ysalary",
                hourlySalary: "$Hsalary",
                negotiated: "$negotiated",
                verified: "$verified",
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
                    $arrayElemAt: ["$metadata.total", 0],
                },
                limit,
                ],
            },
            },
            totalResults: "$metadata.total",
            currentPage: {
            $cond: [
                {
                $arrayElemAt: ["$metadata.total", 0.0], //50
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
            hasPreviousPage: {
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
            $arrayElemAt: ["$totalResults", 0],
            },
        },
        },
    ];


    try {
        const results = await Article.aggregate(pipeline).allowDiskUse(true);
        response = {
            data:{
                success:true, 
                articles: results[0].data,
                currentPage: results[0].currentPage,
                hasNextPage: results[0].hasNextPage,
                hasPreviousPage: results[0].hadPreviousPage,
                totalPages: results[0].totalPages,
                prevPage: results[0].prevPage,
                nextPage: results[0].nextPage,
                numberResults: results[0].numberResults ? results[0].numberResults : 0,
            },
            status:200
        }
    } catch (error) {
        response = {
            data: {
                success:false, 
                message:'error while retreiving data'
            },
            status:500
        }
    }finally{
        return response
    }
}


const getSingleArticle = async (id:string):Promise<ARTICLE_RES>=>{

    let response = {data:{},status:404}
    const validID = id.replace(/[^a-zA-Z0-9-]/g, "")
    console.log('valid-id:',validID)
    if(isValidID(validID)){

        const mainPipeline = [
            {
            $match: {
                _id: ObjectId(validID) 
            }
            },
            {
            $project: {
                _id: "$_id",
                projection:{
                title: "$title",
                visits:"$visits",
                date: "$createdAt",
                job_id: "$job_id",
                sub:"$sub",
                location: "$city.value",
                business: "$business",
                salaryType: "$salaryType",
                yearlySalary: "$Ysalary",
                jobSalary: "$jobSalary",
                negotiable: "$negotiable",
                verified: "$verified",
                platform: "$platform",
                commission:"$commission",
                jobType:"$jobType.value",
                additionalInfos:"$additionalInformations",
                group:"$employmentGroup",
                regime:"$employmentRegime.value",
                periode: "$employmentType.value",
                expire:"$expiredDate",
                instructions:"$instructions",
                benefits:"$jobBenefits",
                target:"$job_audience",
                locations:"$location",
                languages:"$languages",
                responsibilities:"$responsibilities",
                commitments:"$specialCommitments",
                vacancy:"$vacancy",
                workHours:"$workHours",
                enviroment:"$workplaceEnvironment",
                zip:"$zipCode",
                address:"$address",
                education:"$educationRequirements",
                experience:"$experience",
                howToApply:"$howToApply",
                externalLink:"$externalLink",
                specialization:"$experienceRequirements",
                organization:"$hiringOrganization",
                startAt:"$startAt",
                slug:"$slug"
                }
            },
            },
        ];

        
        try {
        
        const  article = await Article.aggregate(mainPipeline).option(options); 
        
        if (article) {
            const pipeline:Array<PipelineStage> = [
            {
                $match: {
                $and: [
                    { "status": true },
                    {'platform':{$ne:''}},
                    {"deleted":false},
                    {$or:[{expiredDate:{$gte:new Date()}},{expiredDate:null}]},
                    {
                    sub: ObjectId(article[0].projection.sub),
                    },
                    {
                    "city.value": {$regex:article[0].projection.location.split(' ')[0]},
                    },
                    {
                    status: true,
                    },
                    {
                    _id: {
                        $ne: ObjectId(article[0]._id),
                    },
                    },
                ],
                },
            },
            {
                $project: {
                _id: "$_id",
                title: "$title",
                customId: "$customId",
                job_id: "$job_id",
                business: "$business",
                jobSalary: "$jobSalary",
                visits:"$visits"
                },
            },
            {
                $sort: {
                visits: -1.0,
                },
            },
            {
                $limit: 6.0,
            },
            ];

            const pipelineAlt:Array<PipelineStage> = [
            {
                $match: {
                $and: [
                    { "status": true },
                    {'platform':{$ne:''}},
                    {"deleted":false},
                    {$or:[{expiredDate:{$gte:new Date()}},{expiredDate:null}]},
                    {
                    sub: ObjectId(article[0].projection.sub),
                    },
                    {
                    status: true,
                    },
                    {
                    _id: {
                        $ne: ObjectId(article[0]._id),
                    },
                    },
                ],
                },
            },
            {
                $project: {
                _id: "$_id",
                title: "$title",
                customId: "$customId",
                job_id: "$job_id",
                business: "$business",
                jobSalary: "$jobSalary",
                visits:"$visits"
                },
            },
            {
                $sort: {
                visits: -1.0,
                },
            },
            {
                $limit: 6.0,
            },
            ];

            let similarArticles = await Article.aggregate(pipeline).option(options);
            if (!similarArticles) {
                similarArticles = await Article.aggregate(pipelineAlt).option(options);
            }

            await Article.findOneAndUpdate({_id:id},{$inc:{"visits":1}})


            response = {
                data: {
                    success:true, 
                    article: article[0],
                    similar_articles: similarArticles,
                },
                status:200
            }
        }

        } catch (error) {
            response = {data:{success:false,message:'error while retreiving data'},status:500}
        } finally {
            return response
        }
    }
    return {data:{success:false,message:'article id is not valid, try again'},status:500}
}


