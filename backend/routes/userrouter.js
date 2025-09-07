const express=require("express")
const {login,register,isuserauthenticated,getuserdata,logout,getuserbyid,maketransaction,verifyPremium,getuserPremiumStatus}=require("../controllers/usercontroller")
const userAuth =require("../middlewares/usermidlleware")

const router=express.Router()

router.post('/api/login',login)
router.post('/api/register',register)
router.post('/api/auth',userAuth,isuserauthenticated)
router.get('/api/getalldata',userAuth,getuserdata)
router.post('/api/logout',logout)
router.post('/api/getuserbyid',getuserbyid)


router.post('/subscribe-premium',userAuth,maketransaction)
router.post('/verify-premium',userAuth,verifyPremium)


router.get('/getpremiumstatus',userAuth,getuserPremiumStatus)
module.exports=router