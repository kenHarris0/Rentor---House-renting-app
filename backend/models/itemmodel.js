const mongoose=require("mongoose")

const itemschema=new mongoose.Schema({
    name:{type:String},
    image:{type:String},
     flattype:{type:String},
    persontype:{type:String},
    housetype:{type:String},
    price:{type:String},
    location:{type:String},
    facilities:{type:String},
    owner:{type:String}
})

const itemmodel=mongoose.models.items || mongoose.model("item",itemschema)

module.exports=itemmodel