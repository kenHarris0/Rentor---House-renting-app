const mongoose=require("mongoose")
const dotenv=require("dotenv")

dotenv.config()

const connectdb=async()=>{
    try{
    await mongoose.connect(process.env.MONGO_URI)
    console.log("DB CONNECTED" )
    }
    catch(error){
        console.error(error)
    }
}

module.exports=connectdb