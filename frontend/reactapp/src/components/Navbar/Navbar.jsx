import React, { useContext, useState } from 'react'
import './Navbar.css'
import { Rentcontext } from '../../contexts/Contexts'
import { toast } from 'react-toastify'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import premiumlogo from '../../assets/premium.png'
import prologo from '../../assets/4907289.png'
import ultralogo from '../../assets/ultra.png'
const Navbar = () => {
const {userdata,showlogin,setshowlogin,loginstate,setloginstate,url,isuserauth, setuserdata,haspremium,premiumtype}=useContext(Rentcontext)

const navigator=useNavigate()
const logout=async()=>{
  try{
    const response=await axios.post(url+"/user/api/logout",{},{withCredentials:true})
    if(response.data.success){
      toast.success("logged out successfully")
      await isuserauth()
     setuserdata({
  name:"",
    email:"",
    password:"",
    address:"",
    phone:"",
    city:"",
    listings:[]
     })
     setloginstate(false)
    }
  }
  catch{
    toast.error("failed to logout")
  }
}

let logo=""
if(premiumtype==="pro"){
  logo=prologo
}
if(premiumtype==="premium"){
  logo=premiumlogo
}
if(premiumtype==="ultra"){
  logo=ultralogo
}


const [showlogout,setshowlogout]=useState(false)
  return (
   <div className='navbar'>
  <h1 onClick={()=>navigator("/")}>RENTOR</h1>
  {!haspremium?<div className="premium" ><p onClick={()=>navigator("/premium")}>Get premium</p></div>:<img src={logo} alt='x' className='premiumimg'  onClick={()=>navigator("/premium")}/>}
  {!loginstate ? (
    <button onClick={() => setshowlogin(true)}>Login</button>
  ) : (
    <div className='afterlogin'>
      <div className='user-photo' onClick={()=>setshowlogout(!showlogout)}>
        {userdata?.name ? userdata.name[0].toUpperCase() : "X"}
      </div>
      
      {showlogout && (
        <>
        <div className="user-img">
        <p onClick={()=>navigator("/profile")}>Profile</p>
        <p onClick={logout}>Logout</p>
      </div>
      </>
    )}
    </div>
  )}
</div>

  )
}

export default Navbar
