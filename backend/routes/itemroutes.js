const express=require("express")
const multer=require("multer")
const router=express.Router()
const {additem, getallitems, removeitem,getitembyid}=require("../controllers/itemcontroller");
const { route } = require("./userrouter");
const userAuth =require("../middlewares/usermidlleware")
 const path = require("path");

const storage = multer.diskStorage({
  destination: "itemimage",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  }
});


const upload=multer({storage:storage})

router.post('/additem',upload.single("image"),userAuth,additem)
router.get('/getallitems',getallitems)
router.post('/remove',userAuth,removeitem)
router.post('/getitembyid',getitembyid)

module.exports=router