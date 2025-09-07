const express=require("express")
const Item=require("../models/itemmodel")
const User=require("../models/usermodel")
const additem=async(req,res)=>{
    const userId=req.userId
    const image = req.file ? req.file.filename : null;

    const{name,flattype,persontype,housetype,price,location,facilities}=req.body


    try{
        const newitem=new Item({
            image,name,flattype,persontype,housetype,price,location,facilities,owner:userId

        })

        await newitem.save()
        await User.findByIdAndUpdate(userId, { $push: { listings: newitem._id.toString() } });
        res.json({success:true,payload:newitem})
    }
    catch{
         res.json({success:false,message:"failed to add item "})
    }

}

const removeitem=async(req,res)=>{
    const userId=req.userId
const {itemid}=req.body

try{
    const item=await Item.findByIdAndDelete(itemid)
    if(!item){
        return res.json({success:false,message:"listing not found"})
    }
    const user=await User.findByIdAndUpdate(userId,{$pull :{listings:itemid.toString()}},{new:true})
    if(!user){
        return res.json({success:false,message:"user not found"})
    }

    res.json({success:true,message:"item deleted"})
}
catch{
    res.json({success:false,message:"failed to delete item"})
}

    
}

const getallitems=async(req,res)=>{

    try{
        const items=await Item.find({})
        res.json({success:true,payload:items})
    }
    catch{
        res.json({success:false,message:"failed to fetch items "})
    }
    
}

 const getitembyid=async(req,res)=>{
    const {id}=req.body
    try{
        const itemdata=await Item.findById(id)
       res.json({success:true,payload:itemdata})

    }
    catch{
        res.json({success:false,message:"failed to fetch item "})
    }
 }

module.exports={additem,getallitems,removeitem,getitembyid}