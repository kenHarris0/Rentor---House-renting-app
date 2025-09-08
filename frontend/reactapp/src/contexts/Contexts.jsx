import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

export const Rentcontext=createContext()

const Rentcontextprovider = ({children}) => {
    
  axios.defaults.withCredentials = true;
  
const url="https://rentor-backend.onrender.com"
//users filters
const [userfilter,setuserfilter]=useState({
    flattype:"all",
    persontype:"all",
    housetype:"all",
    price:"all",
    location:"all",
    facilities:"all"

})
// for navbar - to toggle login page on same page 
const [showlogin,setshowlogin]=useState(false)
const[loginstate,setloginstate]=useState(false)
//login user data
const [userdata,setuserdata]=useState({
    name:"",
    email:"",
    password:"",
    address:"",
    phone:"",
    city:"",
    listings:[]
})

// to see if user is authenticated to manage the data as well as the login state

const isuserauth=async()=>{
    try{
        const response=await axios.post(url+"/user/api/auth",{},{withCredentials:true})
        if(response.data.success){
            setloginstate(true)
            await fetchuserdata()
        }
    }
    catch(error){
       console.log(error)

    }
}

const fetchuserdata=async()=>{
    try{
     const response=await axios.get(url+"/user/api/getalldata",{withCredentials:true})
     if(response.data.success){
        setuserdata(response.data.payload)
     }
    }
    catch{
        setuserdata({
             name:"",
    email:"",
    password:"",
    address:"",
    phone:"",
    city:"",
    listings:[]
        })
    }
}









// to get all listings from db

const [alllistings, setalllistings] = useState([])

  // fetch all listings
  const getalllistings = async () => {
    try {
      const response = await axios.get(url+"/item/getallitems", {withCredentials:true})
      if(response.data.success){
        setalllistings(response.data.payload)
      }
    } catch (error) {
      console.log(error)
    }
  }


// premium functionality

const [haspremium,sethaspremium]=useState(false)
const [premiumtype,setpremiumtype]=useState("")

const fetchuserpremiumStatus=async()=>{

const response=await axios.get(url+"/user/getpremiumstatus",{withCredentials:true})
if(response.data.success){
  const data=response.data.payload
  sethaspremium(true)
  setpremiumtype(data.premium)


  

}


}





const value={
    userfilter,
    setuserfilter,
    showlogin,
    setshowlogin,
    userdata,
    setuserdata,
    url,
    loginstate,
    setloginstate,
    isuserauth,
    fetchuserdata,
    alllistings, setalllistings,
    getalllistings,

    haspremium,sethaspremium,
    premiumtype,setpremiumtype


}

useEffect(  ()=>{
     isuserauth()
     getalllistings()
     fetchuserpremiumStatus()
},[])


  return (
    <div>
        <Rentcontext.Provider value={value}>
            {children}
        </Rentcontext.Provider>

      
    </div>
  )
}

export default Rentcontextprovider
