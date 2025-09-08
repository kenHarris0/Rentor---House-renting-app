const mongoose=require("mongoose")
const User=require("../models/usermodel")
const jwt=require("jsonwebtoken")
const cookieParser=require("cookie-parser")
const bcrypt=require("bcrypt")
const { request } = require("express")
const transporter=require("../config/nodemailer")
const signupmail=require("../config/mailformater")
const Stripe=require("stripe")

const login =async(req,res)=>{
    const {email,password}=req.body
try{
    const user=await User.findOne({email})

    if(!user){
        return res.json({success:false,message:"no users found"})
    }
    const verfy=await bcrypt.compare(password,user.password)
    if(!verfy){
        return res.json({success:false,message:"invalid password"})
    }
    
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET, { expiresIn: "1h" })
    res.cookie("token",token,{
        httpOnly:true,
        secure:true,
        sameSite:"none",
        maxAge:60*60*1000
    })

    res.json({success:true,message:"logged in"})
}
catch(error){
    console.log(error)
    res.json({success:false,message:"log in failed"})
}
}

const register=async(req,res)=>{
    const{name,email,password,address,phone,city}=req.body

    try{
        const user=await User.findOne({email})
        if(user){
            return res.json({success:false,message:"account exists"})
        }
        const hashedpswd=await bcrypt.hash(password,10)
        const newuser=new User({
            name,password:hashedpswd,email,address,phone,city
        })
        await newuser.save()
        const token=jwt.sign({id:newuser._id},process.env.JWT_SECRET, { expiresIn: "1h" })
    res.cookie("token",token,{
        httpOnly:true,
        secure:true,
        sameSite:"none",
        maxAge:60*60*1000
    })
    const maildata={
        from:process.env.SENDER_MAIL,
        to:newuser.email,
        subject:"sign up welcome email to rentor",
        html:signupmail.replaceAll("{{username}}",newuser.name).replaceAll("{{useremail}}",newuser.email)

    }
    await transporter.sendMail(maildata)
    res.json({success:true,message:"registered successfully"})
    }
    catch{
         res.json({success:false,message:"register failed"})
    }
}

const isuserauthenticated=async(req,res)=>{
    try{
        res.json({success:true,message:"user authenticated"})
    }
    catch{
        res.json({success:false,message:"failed authentication"})
    }
}

const getuserdata=async(req,res)=>{
    const userId=req.userId
    try{
        const user=await User.findById(userId)
        if(!user){
            return res.json({success:false,message:"unable to find user"})
        }
        res.json({success:true,payload:user})
    }
    catch{
        res.json({success:false,message:"failed to fetch data"})
    }
}
 const getuserbyid=async(req,res)=>{
    const {id}=req.body
    try{
        const userdata=await User.findById(id)
        res.json({success:true,payload:userdata})

    }
    catch{
        res.json({success:false,message:"failed to fetch data"})
    }
 }

const logout=async(req,res)=>{
    try{
        res.clearCookie("token",{
             httpOnly:true,
            secure:true,
            sameSite:"none",
            maxAge:60*60*1000
        })
        res.json({success:true,message:"logged out"})
    }
    catch{
         res.json({success:false,message:"failed to log out"})
    }
}

const maketransaction=async(req,res)=>{
    const userId=req.userId

    const {plan}=req.body
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const frontendurl = "https://rentor-house-renting-app.onrender.com";

    let price=0
    if(plan==="premium") price=1000
    if(plan==="pro") price=2000
    if(plan==="ultra") price=3000
try{
    const session=await stripe.checkout.sessions.create({
         payment_method_types: ["card"],
         line_items:[
            {
                price_data:{
                    currency:"inr",
                    product_data:{
                        name:`${plan.toUpperCase()} subsciption `
                    },
                    unit_amount:price*100*80
                },
                quantity:1,
            },
         ],
         mode:"payment",
           success_url: `${frontendurl}/verify-premium?success=true&userId=${userId}&plan=${plan}`,
      cancel_url: `${frontendurl}/verify-premium?success=false&userId=${userId}`,
    })

  res.json({ success: true, session_url: session.url });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }


}


const verifyPremium = async (req, res) => {
  try {
    const { success, userId, plan } = req.body;

    if (success === "true") {
      let expiry = new Date();
      expiry.setMonth(expiry.getMonth() + 1); 

      await User.findByIdAndUpdate(userId, {
        premium: plan,
        premiumExpiry: expiry,
      });

      return res.json({ success: true, message: "Premium activated!" });
    } else {
      return res.json({ success: false, message: "Payment failed" });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};



const getuserPremiumStatus=async(req,res)=>{
    const userId=req.userId
    try{
        const user=await User.findById(userId)
        if(!user){
            return res.json({success:false,message:"failed to fetch premium status"})
        }
        const data={premium:user.premium,premiumExpiry:user.premiumExpiry}

        res.json({success:true,payload:data})

    }
    catch{
        res.json({success:false,message:"premium fetching failed"})
    }
}


module.exports={login,register,isuserauthenticated,getuserdata,logout,getuserbyid,maketransaction,verifyPremium,getuserPremiumStatus}
