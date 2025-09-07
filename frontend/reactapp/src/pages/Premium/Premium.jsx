import React from 'react'
import './Premium.css'
import axios from 'axios'
import {toast} from 'react-toastify'
import { useContext } from 'react'
import { Rentcontext } from '../../contexts/Contexts'
import premiumlogo from '../../assets/premium.png'
import prologo from '../../assets/4907289.png'
import ultralogo from '../../assets/ultra.png'
const Premium = () => {


const {url}=useContext(Rentcontext)

const handlesubmit=async(plan)=>{
  const response=await axios.post(url+"/user/subscribe-premium",{plan:plan},{withCredentials:true})
  if(response.data.success){
    const redirect=response.data.session_url
    window.location.href = redirect;
  }
  else{
    toast.error("error occoured during transaction")
  }
}


  return (
    <div className='premiumpg'>
     
        <h1>🌟 Upgrade to Rentor Premium Plans</h1>
        <p>Choose the plan that suits you best and make renting smarter, faster, and more affordable.</p>

        <div className="plans-container">
          
          <div className="plan-card">
            <h2><img src={premiumlogo} alt="" className='xxx'/> Premium</h2>
            <p>Perfect for starters</p>
            <ul>
              <li>✅ <strong>10% discount</strong> on all rents</li>
              <li>✅ Valid for <strong>1 month</strong></li>
              <li>✅ Early access to new listings</li>
            </ul>
            <button className="subscribe-btn" onClick={()=>handlesubmit("premium")}>Subscribe Premium</button>
          </div>

         
          <div className="plan-card">
            <h2><img src={prologo} alt="" className='xxx'/> Premium Pro</h2>
            <p>For regular renters</p>
            <ul>
              <li>✅ <strong>20% discount</strong> on all rents</li>
              <li>✅ Valid for <strong>1 month</strong></li>
              <li>✅ Priority access to new listings</li>
              <li>✅ Exclusive Pro offers</li>
            </ul>
            <button className="subscribe-btn" onClick={()=>handlesubmit("pro")}>Subscribe Pro</button>
          </div>

         
          <div className="plan-card">
            <h2><img src={ultralogo} alt="" className='xxx'/> Premium Ultra</h2>
            <p>Best value for power users</p>
            <ul>
              <li>✅ <strong>30% discount</strong> on all rents</li>
              <li>✅ Valid for <strong>1 month</strong></li>
              <li>✅ Top priority access to listings</li>
              <li>✅ Exclusive Ultra rewards</li>
            </ul>
            <button className="subscribe-btn" onClick={()=>handlesubmit("ultra")}>Subscribe Ultra</button>
          </div>
        </div>
      </div>
   
  )
}

export default Premium
