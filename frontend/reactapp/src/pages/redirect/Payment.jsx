import React from 'react'
import './Payment.css'
import {useNavigate, useSearchParams} from 'react-router-dom'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { useContext } from 'react'
import { Rentcontext } from '../../contexts/Contexts'
import { toast } from 'react-toastify'


const Payment = () => {
const [searchParams,setSearchParams]=useSearchParams()


const [ispremium,setispremium]=useState(false)
const success=searchParams.get("success")
const userId=searchParams.get("userId")
const plan=searchParams.get("plan")



const navigator=useNavigate()
const {url}=useContext(Rentcontext)

const verify=async()=>{

    try{
        const response=await axios.post(url+"/user/verify-premium",{success,userId,plan},{withCredentials:true})
        if(response.data.success){
            setTimeout(() => {
                navigator("/")
            }, 5000);
            setispremium(true)
        }
    }
    catch(error){
        console.log(error);
        toast.error("Fsiled to activate subscription")
    }

}
 useEffect(() => {
    verify()
  }, [])
  return (
    <div className='payments'>
        {ispremium && <div><p>🎉 Premium Activated!</p><p>Your subscription is now active. Enjoy exclusive discounts and benefits for the next 30 days.</p></div>}
      
    </div>
  )
}

export default Payment
