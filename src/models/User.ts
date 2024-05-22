import mongoose from 'mongoose';

const Schema = mongoose.Schema;


const PreferenceType = new Schema({
    title: { type: String },
    city: { type: String },
    category: {
        type:Schema.Types.ObjectId,
        ref:'Category'
    },
    subCategory:{
        type:Schema.Types.ObjectId,
        ref:'SubCategory'
    }
});

const JobAlertType = new Schema({
    articles: [{ type: String }],
    preferences: { type: PreferenceType },
});


const AddressType = new Schema({
    homeAddress:{ type: String },
    zipCode:{ type: String ,required:true},
    city: { type: String ,required:true},
    country: { type: String ,required:true},
    education_level:{ type: String },
});




const UserSchema = new Schema({
    line_of_work:{ type: String },
    apiKey:{
        type:String,
    },
    secretKey: { type: String ,required:true},
    firstname: { type: String ,required:true},
    lastname: { type: String ,required:true},
    phone: { type: String},
    showPhone:{ type: Boolean, default: false },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
    },
    address:{
        type:AddressType
    },
    avatar:{
        type:Number,
        default:1,
    },
    status:{
        type:Boolean,
        require:true
    },
    resume:{
        type:String,
    },
    jobAlert:{
        type:JobAlertType
    },
    savedJobs:[{
        type:Schema.Types.ObjectId,
        ref:'Article'
    }],
    appliedJobs:[{
        type:Schema.Types.ObjectId,
        ref:'Article'
    }],
    updatedBy:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    
},{timestamps: true}) 


const User = mongoose.models.User  || mongoose.model('User', UserSchema);

export default User;