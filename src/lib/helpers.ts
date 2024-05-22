import {Types } from "mongoose";
import moment from 'moment';
import {Category} from '@/models/Category';
import { OAuth2Client, TokenPayload } from "google-auth-library";
import { ReadonlyURLSearchParams } from "next/navigation";
import {PlatformList} from "@/lib/staticData"

export const ObjectId=(x:string) => new Types.ObjectId(x);

export const getPagination = (page:number, size:number) => {
  const limit = size ? size : 10;
  const offset = page ? (page - 1) * limit : 0;
  // tt = 100
  /// 40 = 5-1 * 10
  return { limit, offset };
};


function isJsonString(str:string):boolean {
  try {
      JSON.parse(str) ;
  } catch (e) {
      return false;
  }
  return true;
}

const sortValues = ["recent", "popular"];

type Query ={
    cat?:string,
    sub?:string,
    wr?:string, // work regime
    wg?:string, // work group 
    ys?:string, // yearly salary
    exp?:string|number, 
    wb?:string|Array<string>, 
    lg?:string, 
    wc?:string, // work condition
    pd?:string, 
    loc?:string, 
    emt?:string, //employmentType
    jt?:string,  //jobType
    pf?:string,
    hr?:string,
    page:string|number,
    size:string|number,
    q:string
}



export const matchStage = async (query:URL) => {
  const cat = query.searchParams.get('cat')
  const sub = query.searchParams.get('sub')
  const wr = query.searchParams.get('wr')
  const wg = query.searchParams.get('wg')
  const ys = query.searchParams.get('ys')
  const exp = query.searchParams.get('exp')
  const wb = query.searchParams.get('wb')
  const lg = query.searchParams.get('lg')
  const wc = query.searchParams.get('wc')
  const pd = query.searchParams.get('pd')
  const loc = query.searchParams.get('loc')
  const emt = query.searchParams.get('emt')
  const jt = query.searchParams.get('jt')
  const hr = query.searchParams.get('hr')
  const pf = query.searchParams.get('pf')


  const matchPipeline:Array<object> = [{'sub':{$ne:null}},{ "status": true },{'platform':{$ne:''}},{"deleted":false},{$or:[{expiredDate:{$gte:new Date()}},{expiredDate:null}]}];

  // location filter //
   if (loc && typeof loc === "string") {
    const newLocation = loc.split(',')[0]
    matchPipeline.push({ $or: [{ "city.name": newLocation }, { location: {$regex:newLocation} }] });
  }

  // platform filter //
  if (pf && typeof pf === "string") {
    const platFrom = PlatformList.find(e=>e.value===pf)
    if(platFrom){
      matchPipeline.push({ platform: platFrom.id});
    }
  }

  // sub-category filter //

  const subcategories = sub && isJsonString(sub) ? JSON.parse(sub) : sub;

  if(subcategories){
    if (Array.isArray(subcategories) && subcategories.length) {
      const subs = subcategories.map((e) => ObjectId(e));
      matchPipeline.push({ sub: { $in: subs } });
    }
    if(typeof(subcategories)==="string"){
      if(isValidID(subcategories)){
        matchPipeline.push({ sub: ObjectId(subcategories) });
      }else{
        matchPipeline.push({ code: {$eq:subcategories}});
      }
    }
  }


   // sub-category filter //

   const category = cat && isJsonString(cat) ? JSON.parse(cat) : cat;

   if(category && (typeof(subcategories) ==='string' && subcategories.length===0 || subcategories!==undefined) ){

     if(typeof(category)==="string"){
      let targetCategory= [] 
      if(isValidID(category)){
        const targetCat = await Category.findById(category)
        targetCategory = targetCat?.subCategories || []
      }else{
        const targetCat = await Category.findOne({code:{$eq:category}})
        targetCategory = targetCat?.subCategories || []
      }
      if(targetCategory){
        matchPipeline.push({ sub: {$in: targetCategory} });
      }
     }
   }




  //hourly rate ///
  const hourlyRate = hr && isJsonString(hr) ? JSON.parse(hr) : hr;
  if (Array.isArray(hourlyRate) && hourlyRate.length) {
    if(hourlyRate.length>1){
      matchPipeline.push({
        salaryBase: { $elemMatch: { $gte: hourlyRate[0], $lte: hourlyRate[1] } },
      });
    }else{
      matchPipeline.push({
        salaryBase: { $elemMatch: { $eq: hourlyRate[0]} },
      });
    }
  }


  // work contract filter //

  if (emt && typeof emt === "string") {
    const wtTypes = ["pe", "te", "se", "ca"]; //pr= permanant, te= temporary, se= seasonal, ca= casual
    if (wtTypes.includes(emt)) {
      matchPipeline.push({ "employmentType.type": emt });
    }
  }

  // employmentRegime filter //
  if (wr && typeof wr === "string") {
    const wrTypes = ["pt", "ft"]; // pt = part-time, ft=full-time
    if (wrTypes.includes(wr)) {
      matchPipeline.push({ "employmentRegime.type": wr });
    }
  }

  // jobType filter //
  if (jt && typeof jt === "string") {
    const jobTypes = ["ot", "st", "in", "ap"]; // ot= other, st=student, in=intership, ap=apprentice
    if (jobTypes.includes(jt)) {
      matchPipeline.push({ "jobType.type": jt });
    }
  }

  // yearlySalary filter //
  if (ys && typeof ys === "string") {
    if (ys === "T") {
      matchPipeline.push({
        Ysalary: { $elemMatch: { $gte: 20000, $lte: 39999 } },
      });
    }
    if (ys === "F") {
      matchPipeline.push({
        Ysalary: { $elemMatch: { $gte: 40000, $lte: 59999 } },
      });
    }
    if (ys === "S") {
      matchPipeline.push({
        Ysalary: { $elemMatch: { $gte: 60000, $lte: 79999 } },
      });
    }
    if (ys === "E") {
      matchPipeline.push({
        Ysalary: { $elemMatch: { $gte: 80000, $lte: 99999 } },
      });
    }
    if (ys === "H") {
      matchPipeline.push({
        Ysalary: { $elemMatch: { $gte: 100000 } },
      });
    }
  }

  // work conditions filter //
  const parsedWC = wc && isJsonString(wc) ? JSON.parse(wc) : wc;
  if (Array.isArray(wc) && parsedWC.length) {
    const conditions = [
      { code: "d", value: "Day" },
      { code: "m", value: "Morning" },
      { code: "e", value: "Evening" },
      { code: "w", value: "Weekend" },
      { code: "s", value: "Shift" },
      { code: "em", value: "Early Morning" },
      { code: "n", value: "Night" },
      { code: "f", value: "Flexible Hours" },
      { code: "o", value: "Overtime" },
      { code: "oc", value: "On Call" },
    ];

    const workConditions = conditions
      .filter((e) => parsedWC.includes(e.code))
      .map((e) => e.value);
    if (workConditions.length) {
      matchPipeline.push({
        "specialCommitments.commitsArray": {
          $elemMatch: {
            $in: workConditions,
          },
        },
      });
    }
  }

  // Experience filter //
  if ( typeof exp === "string" && exp && parseInt(exp)) {
    const experience = Number(exp);
    if (experience === 0) {
      matchPipeline.push({
        experience: { $elemMatch: { duration: { $eq: 0 } } },
      });
    }

    if (experience === 1) {
      matchPipeline.push({
          "experience.duration": { $gt: 1, $lt: 12 },
          "experience.Extype": "months",
      });
    }

    if (experience === 2) {
      matchPipeline.push({
        $or: [
          {
            "experience.duration": { $gt: 12, $lte:24 },
            "experience.Extype": "months",
          },
          {
            "experience.duration": { $eq: 2 },
            "experience.Extype": "years",
          }
        ]
      })
    }

    if (experience === 3) {
      matchPipeline.push({
        experience: {
          $elemMatch: {
            duration: { $gte: 3 },
            Extype: "years",
          },
        },
      });
    }
  }

  // language at work filter //
  if (lg && typeof lg === "string") {
    const languages = ["en", "fr", "b",];
    if (languages.includes(lg)) {
      if (lg === "b") {
        matchPipeline.push({
          "languages.lang": "b"
        });
      } else {
        matchPipeline.push({
          $or: [{ "languages.lang": lg }, { "languages.lang": "m" }],
        });
      }
    }
  }


  // date posted filter //
  const days = ["2", "7", "15", "30", "+30"];
  if (pd && typeof pd === "string") {
    if(days.includes(pd)){
      if (pd === "+30") {
        const articleAge = moment().subtract(30, "days").format("YYYY-MM-DD");
        matchPipeline.push({ date: { $lt: new Date(articleAge) } });
      } else {
        const daysNumber = Number(pd);
        const articleAge = moment()
          .subtract(daysNumber, "days")
          .format('YYYY-MM-DD')+'T00:00:00';
          console.log('article:',articleAge)
          matchPipeline.push({ date: { $gte: articleAge } });
      }
    }
  }


  // employmentGroup filter //
  if (wg && typeof wg === "string") {
    const wgType = [
      {
        type: "inp",
        value: "Indigenous people",
      },
      {
        type: "pwd",
        value: "Persons with disabilities",
      },
      {
        type: "nc",
        value: "Newcomers",
      },
      {
        type: "ow",
        value: "Older workers",
      },
      {
        type: "vet",
        value: "Veterans",
      },
      {
        type: "yth",
        value: "Youth",
      },
      {
        type: "vim",
        value: "Visible minorities",
      },
      {
        type: "oth",
        value: "others",
      },
    ];

    let newWg = wgType.filter((e) => wg === e.type).map(e=>e.value)

    if (newWg.length) {
      matchPipeline.push({ employmentGroup: { $in: newWg } });
    }
  }


  // work benifits filter //
  const listbenifits = [
    { title: "ob", value: "Other benefits" },
    { title: "hb", value: "Health benefits" },
    { title: "lb", value: "Long term benefits" },
    { title: "fb", value: "Financial benefits" },
  ];

  const newWB = typeof wb === "string"  && isJsonString(wb) ? JSON.parse(wb) : wb
  if (Array.isArray(newWB)) {
    const workBenifits = listbenifits.filter((e) => newWB.includes(e.title)).map(e=>e.value)
    if (workBenifits.length) {
      matchPipeline.push({
        jobBenefits: {
          $elemMatch: {
            title: {$in : workBenifits},
          },
        },
      });
    }
  }
 

 
  function isNumeric(value:string):boolean {
    return /^\d+$/.test(value) || /^\d+\.\d+$/.test(value);
  }

  
  return {
    $match:{
        $and: matchPipeline,
    }
  };
};

/* exports.matchPreview = async (query:Query,exclude) => {
  let matchPipeline = [{'sub':{$ne:null}},{ "status": true },{'platform':{$ne:''}},{"deleted":false},{$or:[{expiredDate:{$gte:new Date()}},{expiredDate:null}]}];

  console.log('query:',query)
  query[exclude] = null
  const {cat,sub,wr, wg, ys, exp, wb, lg, wc, pd, loc, emt , jt, pf } = query;
  
  console.log('new query',query)
  


  // location filter //
   if (loc && typeof loc === "string") {
    const newLocation = loc.split(',')[0]
    const regValue = new RegExp(".*" + newLocation + ".*");
    matchPipeline.push({ $or: [{ "city.name": regValue }, { location: regValue }] });
  }

  // platform filter //
  console.log('typof:',typeof(pf))
  if (pf && typeof pf === "string") {
    matchPipeline.push({ platform: {$regex:pf}});
  }

  // sub-category filter //

  const subcategories = sub && isJsonString(sub) ? JSON.parse(sub) : sub;

  if(subcategories){
    if (Array.isArray(subcategories) && subcategories.length) {
      const subs = subcategories.map((e) => ObjectId(e));
      matchPipeline.push({ sub: { $in: subs } });
    }
    if(typeof(subcategories)==="string"){
      if(IsObjectID(subcategories)){
        matchPipeline.push({ sub: ObjectId(subcategories) });
      }else{
        matchPipeline.push({ code: {$eq:subcategories}});
      }
    }
  }


   // sub-category filter //

   const category = cat && isJsonString(cat) ? JSON.parse(cat) : cat;

   if(category && typeof(subcategories) ==='string' && subcategories.length===0 ){

     if(typeof(category)==="string"){
      let targetCategory= {subCategories:[]}
      if(IsObjectID(category)){
        targetCategory = await Category.findById(category)
      }else{
        targetCategory = await Category.findOne({code:{$eq:category}})
      }
      if(targetCategory){
        matchPipeline.push({ sub:{$in: targetCategory.subCategories} });
      }
     }
   }





  // work contract filter //

  if (emt && typeof emt === "string") {
    const wtTypes = ["pe", "te", "se", "ca"]; //pr= permanant, te= temporary, se= seasonal, ca= casual
    if (wtTypes.includes(emt)) {
      matchPipeline.push({ "employmentType.type": emt });
    }
  }

  // employmentRegime filter //
  if (wr && typeof wr === "string") {
    const wrTypes = ["pt", "ft"]; // pt = part-time, ft=full-time
    if (wrTypes.includes(wr)) {
      matchPipeline.push({ "employmentRegime.type": wr });
    }
  }

  // jobType filter //
  if (jt && typeof jt === "string") {
    const jobTypes = ["ot", "st", "in", "ap"]; // ot= other, st=student, in=intership, ap=apprentice
    if (jobTypes.includes(jt)) {
      matchPipeline.push({ "jobType.type": jt });
    }
  }

  // yearlySalary filter //
  if (ys && typeof ys === "string") {
    if (ys === "T") {
      matchPipeline.push({
        Ysalary: { $elemMatch: { $gte: 20000, $lte: 39999 } },
      });
    }
    if (ys === "F") {
      matchPipeline.push({
        Ysalary: { $elemMatch: { $gte: 40000, $lte: 59999 } },
      });
    }
    if (ys === "S") {
      matchPipeline.push({
        Ysalary: { $elemMatch: { $gte: 60000, $lte: 79999 } },
      });
    }
    if (ys === "E") {
      matchPipeline.push({
        Ysalary: { $elemMatch: { $gte: 80000, $lte: 99999 } },
      });
    }
    if (ys === "H") {
      matchPipeline.push({
        Ysalary: { $elemMatch: { $gte: 100000 } },
      });
    }
  }

  // work conditions filter //
  const parsedWC = wc && isJsonString(wc) ? JSON.parse(wc) : wc;
  if (Array.isArray(wc) && parsedWC.length) {
    const conditions = [
      { code: "d", value: "Day" },
      { code: "m", value: "Morning" },
      { code: "e", value: "Evening" },
      { code: "w", value: "Weekend" },
      { code: "s", value: "Shift" },
      { code: "em", value: "Early Morning" },
      { code: "n", value: "Night" },
      { code: "f", value: "Flexible Hours" },
      { code: "o", value: "Overtime" },
      { code: "oc", value: "On Call" },
    ];

    const workConditions = conditions
      .filter((e) => parsedWC.includes(e.code))
      .map((e) => e.value);
    if (workConditions.length) {
      matchPipeline.push({
        "specialCommitments.commitsArray": {
          $elemMatch: {
            $in: workConditions,
          },
        },
      });
    }
  }

  // Experience filter //
  if ( typeof exp === "string" && exp && parseInt(exp)) {
    const experience = Number(exp);
    if (experience === 0) {
      matchPipeline.push({
        experience: { $elemMatch: { duration: { $eq: 0 } } },
      });
    }

    if (experience === 1) {
      matchPipeline.push({
          "experience.duration": { $gt: 1, $lt: 12 },
          "experience.Extype": "months",
      });
    }

    if (experience === 2) {
      matchPipeline.push({
        $or: [
          {
            "experience.duration": { $gt: 12, $lte:24 },
            "experience.Extype": "months",
          },
          {
            "experience.duration": { $eq: 2 },
            "experience.Extype": "years",
          }
        ]
      })
    }

    if (experience === 3) {
      matchPipeline.push({
        experience: {
          $elemMatch: {
            duration: { $gte: 3 },
            Extype: "years",
          },
        },
      });
    }
  }

  // language at work filter //
  if (lg && typeof lg === "string") {
    const languages = ["en", "fr", "b",];
    if (languages.includes(lg)) {
      if (lg === "b") {
        matchPipeline.push({
          "languages.lang": "b"
        });
      } else {
        matchPipeline.push({
          $or: [{ "languages.lang": lg }, { "languages.lang": "m" }],
        });
      }
    }
  }


  // date posted filter //
  const days = ["2", "7", "15", "30", "+30"];
  if (pd && typeof pd === "string") {
    console.log('pd:',pd)
    if(days.includes(pd)){
      if (pd === "+30") {
        const articleAge = moment().subtract(30, "days").format("YYYY-MM-DD");
        matchPipeline.push({ date: { $lt: new Date(articleAge) } });
      } else {
        const daysNumber = Number(pd);
        const articleAge = moment()
          .subtract(daysNumber, "days")
          .format('YYYY-MM-DD')+'T00:00:00';
          console.log('article:',articleAge)
          matchPipeline.push({ date: { $gte: articleAge } });
      }
    }
  }


  // employmentGroup filter //
  if (wg && typeof wg === "string") {
    const wgType = [
      {
        type: "inp",
        value: "Indigenous people",
      },
      {
        type: "pwd",
        value: "Persons with disabilities",
      },
      {
        type: "nc",
        value: "Newcomers",
      },
      {
        type: "ow",
        value: "Older workers",
      },
      {
        type: "vet",
        value: "Veterans",
      },
      {
        type: "yth",
        value: "Youth",
      },
      {
        type: "vim",
        value: "Visible minorities",
      },
      {
        type: "oth",
        value: "others",
      },
    ];

    let newWg = wgType.filter((e) => wg === e.type).map(e=>e.value)

    if (newWg.length) {
      matchPipeline.push({ employmentGroup: { $in: newWg } });
    }
  }


  // work benifits filter //
  const listbenifits = [
    { title: "ob", value: "Other benefits" },
    { title: "hb", value: "Health benefits" },
    { title: "lb", value: "Long term benefits" },
    { title: "fb", value: "Financial benefits" },
  ];

  const newWB = typeof wb === "string"  && isJsonString(wb) ? JSON.parse(wb) : wb
  if (Array.isArray(newWB)) {
    const workBenifits = listbenifits.filter((e) => newWB.includes(e.title)).map(e=>e.value)
    if (workBenifits.length) {
      matchPipeline.push({
        jobBenefits: {
          $elemMatch: {
            title: {$in : workBenifits},
          },
        },
      });
    }
  }
 
  console.log('matchPipeline.length:',matchPipeline)
  
  const matchPiplineData = {
    $and: matchPipeline,
  }
  return {
    $match: matchPipeline.length ?  matchPiplineData  :{},
  };
};
 */


type Visits = {
    visits:number
}
type CreatedAt = {
    createdAt:number
}
type SortType = {
    $sort:Visits|CreatedAt
}

export const sortStage = (query:URL) => {
    const sort = query.searchParams.get('sort')||''

    if (sortValues.includes(sort)) {
      if (sort === "recent") {
        return {
          $sort: {
            createdAt: -1,
          },
        }
      }
      else if (sort === "popular") {
        return {
          $sort: {
            visits: -1,
          },
        };
      }
      }else{
        return {
          $sort: {
            createdAt: -1,
          },
        }
      }

    return {}
}


export const isEmpty = (value:object):boolean => {
  return Object.keys(value).length === 0;
};

export const Capitalize = (str:string):string=> {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const isValidID =(id:string)=>{
    return Types.ObjectId.isValid(id);
}


type Error = {
  error:string
}
interface GooglePaylod extends TokenPayload  {
  error?: string
}

export const verifyGoogleToken = async (token:string):Promise<GooglePaylod>=>{
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: "1090215122567-u8qabva6pkmcm9bhr6uni13hnp10l45j.apps.googleusercontent.com",
    });
    const payload = ticket.getPayload();
    if(!payload){
      const error = {error: "Invalid user detected. Please try again" } as GooglePaylod;
      return error
    }
    return payload;
  } catch (error) {
    return { error: "Invalid user detected. Please try again" } as GooglePaylod;
  }
}


export const updateQuery = (key:string,value:string|number,searchParams:ReadonlyURLSearchParams)=>{
  const query = new URLSearchParams(Array.from(searchParams.entries()))

  const oldValue=query.get(key)
  if(oldValue!==value){
      query.set(key,String(value))
  }else{
      query.delete(key)
  } 

  const newQuery = query.toString() ? `?${query.toString()}`:''
  return newQuery
}