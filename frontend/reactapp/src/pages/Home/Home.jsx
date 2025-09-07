import React, { useContext, useEffect } from 'react'
import './Home.css'
import Sidebar from '../../components/sidebar/Sidebar'
import homelogo from '../../assets/homey.jpg'
import { Rentcontext } from '../../contexts/Contexts'
import { useNavigate } from 'react-router-dom'
const Home = () => {
const{fetchuserdata,alllistings, setalllistings,getalllistings,userdata,url,userfilter}=useContext(Rentcontext)
const navigator=useNavigate()
const handlenav=(id)=>{
  navigator(`/listing/${id}`)
}

const filteredListings=alllistings.filter((listing)=>{
  return Object.entries(userfilter).every(([key,value])=>{
    if(value==="all") return true
    return String(listing[key]).toLowerCase()===String(value).toLowerCase();
  })

})

useEffect(()=>{
  fetchuserdata()
  getalllistings()
},[])
  return (
    <div className='homepage'>
     
        <div className="hero-item">
          <img src={homelogo} alt="x" />
         
          

        </div>
         <div className="texts">
        <h2>Your next House in single App</h2>
          <h4>Make your dreams come True,select from hundreds of houses from trusted users</h4>
          </div>


<div className="container">

        <div className="left-part">
           <Sidebar/>
        </div>

        <div className="right-part">
          <h1>All Listings in rentor</h1>
          <div className="rightt">
{filteredListings.map((listing,ind)=>(
  <div className="listing-single" key={ind} onClick={()=>handlenav(listing._id)}>
    <div className="listimg">
      <img src={`${url}/itemimage/${listing.image}`} alt="" />
    </div>
   
    <div className="displ">
      <h3>Name:</h3>
      <p>{listing.name}</p>
    </div>
    
    <div className="displ">
      <h3>Rooms:</h3>
      <p>{listing.flattype}</p>
    </div>
    
    <div className="displ">
      <h3>Person preferred:</h3>
      <p>{listing.persontype}</p>
    </div>

<div className="displ">
      <h3>Type:</h3>
      <p>{listing.housetype}</p>
    </div>

   
    <div className="displ">
      <h3>Price:</h3>
      <p>${listing.price} / month</p>
    </div>
   
    <div className="displ">
      <h3>Location:</h3>
      <p>{listing.name}</p>
    </div>
    
    <div className="displ">
      <h3>Facility:</h3>
      <p>{listing.facilities}</p>
    </div>


  </div>
))}
        </div>
        </div>
</div>
        
      
    </div>
  )
}

export default Home
