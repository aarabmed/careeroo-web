
export const JobTypeList = [
    {
        id: 'st',
        label: 'Student',
        value: 'st'
    },
    {
        id: 'in',
        label: 'Apprentice',
        value:'in'
    },
    {
        id: 'gr',
        label: 'Green jobs',
        value:'gr'
    },
    {
        id: 'ot',
        label: 'Other',
        value:'ot'
    },
    {
        id: 'any',
        label: 'Any',
        value:'any'
    },
]

export const ProvinceList = [
    {
        id: 1,
        label: 'Alberta',
        value: 'AB'
    },
    {
        id: 2,
        label: 'British Columbia',
        value:'BC'
    },
    {
        id: 3,
        label: 'Manitoba',
        value:'MB'
    },
    {
        id: 4,
        label: 'New Brunswick',
        value:'NB'
    },
    {
        id: 5,
        label: 'Newfoundland and Labrador',
        value:'NL'
    },
    {
        id: 6,
        label: 'Northwest Territories',
        value:'NT'
    },
    {
        id: 7,
        label: 'Nova Scotia',
        value:'NS'
    },
    {
        id: 8,
        label: 'Nunavut',
        value:'NU'
    },
    {
        id: 9,
        label: 'Ontario',
        value:'ON'
    },
    {
        id: 10,
        label: 'Prince Edward Island',
        value:'PE'
    },
    {
        id: 11,
        label: 'Québec',
        value:'QC'
    },
    {
        id: 12,
        label: 'Saskatchewan ',
        value:'SK'
    },
    {
        id: 13,
        label: 'Yukon',
        value:'YT'
    },
    {
        id: 14,
        label: 'Any',
        value:''
    }
]

export const WorkConditionList = [
      { id:'D',value: "d", label: "Day" },
      { id:'M',value: "m", label: "Morning" },
      { id:'E',value: "e", label: "Evening" },
      { id:'W',value: "w", label: "Weekend" },
      { id:'S',value: "s", label: "Shift" },
      { id:'EM',value: "em", label: "Early Morning" },
      { id:'N',value: "n", label: "Night" },
      { id:'F',value: "f", label: "Flexible Hours" },
      { id:'O',value: "o", label: "Overtime" },
      { id:'OC',value: "oc", label: "On Call" },
      { id:'any',value: "any", label: "Any" },      
]

export const AnnualSalaryList = [
    { id:"T",value: "T", label: "$20000 to $39999" },
    { id:"F",value: "F", label: "$40000 to $59999" },
    { id:"S",value: "S", label: "$60000 to $79999" },
    { id:"E",value: "E", label: "$80000 to $99999" },
    { id:"H",value: "H", label: "$100000 or above" },
    { id:"any",value: "any", label: "Any" }
]



export const ExperienceList = [
    { id:'1',value: "0", label: "No experience" },
    { id:'2',value: "1", label: "1 Year or less" },
    { id:'3',value: "2", label: "2 years" },
    { id:'4',value: "3", label: "3 years or more" },
    { id:'any',value: "any", label: "Any" }
]

export const PostedDateList = [
    { id:'2',value: "2", label: "last 2 days" },
    { id:'7',value: "7", label: "last 7 days" },
    { id:'15',value: "15", label: "last 15 days" },
    { id:'30',value: "30", label: "since 30 days" },
    { id:'plus30',value: "+30", label: "more than 30 days" },
    //{ id:6,value: "any", label: "Any" }
]

export const EmploymentDurabilityList = [
    { id:'pe',value: "pe", label: "Permanant" },
    { id:'te',value: "te", label: "Temporary" },
    { id:'se',value: "se", label: "Seasonal" },
    { id:'ca',value: "ca", label: "Casual" },
    {id:'oth',value: "oth", label:"Others"},
    { id:'any',value: "any", label: "Any" }
]

export const WorkRegimeList = [
    { id:'FT',value: "ft", label: "Full time" },
    { id:'PT',value: "pt", label: "Part time" },
    { id:'ANY',value: "any", label: "Any" }
]

export const LanguageList = [
    { id:'en',value: "en", label: "English" },
    { id:'fr',value: "fr", label: "French" },
    { id:'b',value: "b", label: "English and French" },
    { id:'any',value: "any", label: "Any" }
]

export const WorkGroupList = [
    { id:'INP',value: "inp", label: "Indigenous people" },
    { id:'PWD',value: "pwd", label: "Persons with disabilities" },
    { id:'NC',value: "nc", label: "Newcomers" },
    { id:'OW',value: "ow", label: "Older workers" },
    { id:'VET',value: "vet", label: "Veterans" },
    { id:'YTH',value: "yth", label: "Youth" },
    { id:'VIM',value: "vim", label: "Visible minorities" },
    { id:'OTH',value: "oth", label: "others" },
    { id:'any',value: "any", label: "Any" }

]

export const PlatformList = [
    { id:'jobbank',value: "jb", label: "JobBank" },
    { id:'jobboom',value: "jo", label: "Jobboom" },
    { id:'québecemploi',value: "qc", label: "Québecemploi" },
    { id:'jobillico',value: "ji", label: "jobillico" },
    { id:'careersinfood.com',value: "cf", label: "Careersinfood" },
    { id:'agcareers.com',value: "ac", label: "Agcareers" },
    { id:'monster',value: "mo", label: "Monster" },
    { id:'jobsmedia.ca',value: "jm", label: "Jobsmedia" },
    { id:'jobpostings.ca',value: "jp", label: "Jobpostings" },
    { id:'applytoeducation',value: "ae", label: "Applytoeducation" },
    { id:'saskjobs',value: "sj", label: "Saskjobs" },
    { id:'indeed.com',value: "in", label: "Indeed" },
    { id:'careerbeacon',value: "cb", label: "Careerbeacon" },
    { id:'civicjobs.ca',value: "cj", label: "Civicjobs" },
    { id:'talent.com',value: "ta", label: "Talent" },
    { id:'86network',value: "nt", label: "86network" },
    { id:'jobs.gc.ca',value: "jgc", label: "Jobs.gc.ca" },
    { id:'ziprecruiter',value: "zr", label: "Ziprecruiter" },
    { id:'any',value: "", label: "Any" }
]