const mongoose=require("mongoose")

const schema=new mongoose.Schema({
    name:{type:String},
    email:{type:String,unique:true},
    password:{type:String},
    address:{type:String},
    phone:{type:String},
    city:{type:String},
    listings:{type:Array,default:[]},
    premium:{type:String,default:"none"},
     premiumExpiry: {type: Date,default: null}
})

const usermodel=mongoose.models.users || mongoose.model("users",schema)

module.exports=usermodel