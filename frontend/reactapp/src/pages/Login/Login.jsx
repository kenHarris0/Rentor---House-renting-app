import React, { useContext, useState } from 'react'
import './Login.css'
import { Rentcontext } from '../../contexts/Contexts'
import axios from 'axios'
import {toast} from 'react-toastify'
import { useNavigate } from "react-router-dom";
 

const Login = () => {
const [currstate,setcurrstate]=useState("signup")
const navigator=useNavigate()
const {showlogin,setshowlogin,loginstate,setloginstate,userdata,setuserdata,url,isuserauth}=useContext(Rentcontext)

const handlechange=(e)=>{
    const name=e.target.name
    const value=e.target.value
    setuserdata(data=>({...data,[name]:value}))
}

const handlesubmit=async(e)=>{
  e.preventDefault()
  if(currstate==="signup"){
    const response=await axios.post(url+"/user/api/register",userdata,{withCredentials:true})
    if(response.data.success){
      toast.success("account created <3")
      setshowlogin(false)
      setloginstate(true)
      await isuserauth()
    }
    else{
      toast.error("signup failed")
    }
  }
  else{
    const response=await axios.post(url+"/user/api/login",{email:userdata.email,password:userdata.password},{withCredentials:true})
    if(response.data.success){
      toast.success("logged in successfully")
      setshowlogin(false)
      setloginstate(true)
      await isuserauth()
    }
    else{
      toast.error("login failed")
    }
  }
}

  return (
    <div className='login'>
        <div className="login-cont">
        <h1>{currstate==="signup"?"Signup":"Login"} <span className='close-form' onClick={()=>setshowlogin(false)}>X</span></h1>
        <form  className='login-form' onSubmit={handlesubmit}>
            
             <input type='email' placeholder='email' name='email' value={userdata.email} onChange={handlechange}/>
              <input type='password' placeholder='password' name='password' value={userdata.password} onChange={handlechange}/>
              {currstate==="signup" && (
                <>
               <input type='text' placeholder='name' name='name' value={userdata.name} onChange={handlechange}/>
             <input type='text' placeholder='address' name='address' value={userdata.address} onChange={handlechange}/>
              <input type='text' placeholder='phone' name='phone' value={userdata.phone} onChange={handlechange}/>
               <input type='text' placeholder='city' name='city' value={userdata.city} onChange={handlechange}/>
               </>
              )}
              

               <button type='submit'>{currstate==="signup"?"Signup":"Login"}</button>


        </form>
      {currstate==="signup"?<p onClick={()=>setcurrstate("login")}>already have an account? login</p>:<p onClick={()=>setcurrstate("signup")}>create an account</p>}
    </div>
    </div>
  )
}

export default Login
