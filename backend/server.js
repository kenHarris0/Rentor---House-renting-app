const express=require("express")
const cors=require("cors")
const connection=require("./config/db")
const cookieParser=require("cookie-parser")

const userrouter=require("./routes/userrouter")
const itemrouter=require("./routes/itemroutes")
const app=express()
const frontendorigin="https://rentor-house-renting-app.onrender.com"
 const path = require("path");
const PORT=process.env.PORT || 4000
app.use(cors({origin:frontendorigin,credentials:true}))
app.use(express.json())
app.use(cookieParser())


app.use('/user',userrouter)
app.use('/item',itemrouter)
app.use("/itemimage", express.static("itemimage"));


app.listen(PORT,()=>{
    connection()
    console.log("server is running ken")
})
