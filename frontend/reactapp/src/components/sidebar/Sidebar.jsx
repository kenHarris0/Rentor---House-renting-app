import React, { useContext, useEffect } from 'react'
import './Sidebar.css'
import {Rentcontext} from '../../contexts/Contexts'
const Sidebar = () => {

const {userfilter,setuserfilter}=useContext(Rentcontext)

const handlechange=(e)=>{
    const name=e.target.name
    const value=e.target.value
    setuserfilter(data=>({...data,[name]:value}))
}

  return (
    <div className='sidebar'>
        <h1>Filters</h1>
        <form className='input-form'>


            <div className='options'>
            <label htmlFor='house-type'>Flat Type</label>
            <select id='house-type' name='flattype' value={userfilter.flattype} onChange={handlechange}>
                <option value="all">all</option>
                <option value="1bhk">1 BHK</option>
                <option value="2bhk">2 BHK</option>
                <option value="3bhk">3 BHK</option>
            </select>
            </div>


           <div className="options">
            <label htmlFor="indi-type">Person</label>
            <select id='indi-type' name='persontype' value={userfilter.persontype} onChange={handlechange}>
                <option value="all">all</option>
                <option value="bachelor">Bachelor</option>
                 <option value="family">Family</option>
            </select>
           </div>
            
           <div className="options">
            <label htmlFor="type">House Type</label>
             <select id='type' name='housetype' value={userfilter.housetype} onChange={handlechange}>
                <option value="all">all</option>
                <option value="pg">Pg/Hostel</option>
                <option value="roomsharing">Roomsharing</option>
                <option value="rent">Rent</option>
            </select>
           </div>

<div className="options">
    <label htmlFor="price">Price</label>
      <input type='text' id='price' placeholder='Price range' name='price' value={userfilter.price} onChange={handlechange} />
</div>
<div className="options">
    <label htmlFor="location">Location</label>
     <input type='text' id='location' placeholder='Area/ location' name='location' value={userfilter.location} onChange={handlechange} />
</div>
          
           


            <div className="options">
                <label htmlFor="facilities">Facilities</label>
            <select id='facilities' name='facilities' value={userfilter.facilities} onChange={handlechange}>
                <option value="all">all</option>
                <option value="westernBath">Western bathroom</option>
                <option value="parking">Parking</option>
                <option value="pets">Pets</option>
                <option value="Maintanance">Maintanance</option>
            </select>
            </div>
            
        </form>
      
    </div>
  )
}

export default Sidebar
