import React, { useContext, useEffect, useState } from 'react'
import './Listing.css'
import { useParams } from 'react-router-dom'
import { toast } from "react-toastify";
import { Rentcontext } from '../../contexts/Contexts'
import axios from 'axios';

const Listing = () => {
  const { id } = useParams();
   const {userdata,alllistings, setalllistings,url, getalllistings,setuserdata,fetchuserdata,haspremium,premiumtype}=useContext(Rentcontext)

  const [itemdata, setitemdata] = useState({
    name: "",
    image: "",
    flattype: "",
    persontype: "", 
    housetype: "",
    price: "",
    location: "",
    facilities: "",
    owner: ""
  });

  const [ownerdata, setownerdata] = useState({
    name: "",
    address: "",
    phone: "",
    city: "",
    listings: []
  });

  useEffect(()=>{
    fetchuserlistings()
  },[userdata,alllistings])
  
  const getownerdata = async (ownerId) => {
    try {
      const response = await axios.post(url + "/user/api/getuserbyid", { id: ownerId }, { withCredentials: true });
      if (response.data.success) {
        setownerdata(response.data.payload);
      }
    } catch {
      toast.error("Can't fetch property lister's data");
    }
  };

 
  const getitemdata = async (itemId) => {
    try {
      const response = await axios.post(url + "/item/getitembyid", { id: itemId }, { withCredentials: true });
      if (response.data.success) {
        const data = response.data.payload;
        setitemdata(data);

        if (data.owner) {
           getownerdata(data.owner);
        }
      }
    } catch {
      toast.error("Can't fetch property data");
    }
  };

  
  useEffect(() => {
    if (id) {
      getitemdata(id);
    }
  }, [id]);


  const[userslisting,setuserslisting]=useState([])
  
  
  const fetchuserlistings=()=>{
    const userListings=alllistings.filter(item=>
    userdata?.listings?.includes(item._id))
    setuserslisting(userListings)
  
  
  }
  

  let discountedprice=itemdata.price
  if(haspremium){
    if(premiumtype==="premium"){
      discountedprice=(itemdata.price)-(0.1*itemdata.price)
    }
    if(premiumtype==="pro"){
      discountedprice=(itemdata.price)-(0.2*itemdata.price)
    }
    if(premiumtype==="ultra"){
      discountedprice=(itemdata.price)-(0.3*itemdata.price)
    }
  }

  return (
    <div className='listing-page'>
      {!itemdata || !itemdata.name ? (
        <div className="rotator">
          <p>Loading listing...</p>
        </div>
      ) : (
        <>
          <h1>You are currently viewing {itemdata.name} listing.</h1>
          <div className="secondcont">
           
            <div className="iteminfo">
              <img src={url + "/itemimage/" + itemdata.image} alt={itemdata.name} />
              <p className="listp"><span className="listspan">Name:</span> {itemdata.name}</p>
              <p className="listp"><span className="listspan">Flat Type:</span> {itemdata.flattype}</p>
              <p className="listp"><span className="listspan">Person Type:</span> {itemdata.persontype}</p>
              <p className="listp"><span className="listspan">House Type:</span> {itemdata.housetype}</p>
              {haspremium?<p className="listp"><span className="listspan discounted">Premium Price:</span> ${discountedprice} / month</p>:<p className="listp"><span className="listspan discounted">Price:</span> ${itemdata.price} / month</p>}
              <p className="listp"><span className="listspan">Location:</span> {itemdata.location}</p>
              <p className="listp"><span className="listspan">Facilities:</span> {itemdata.facilities}</p>
               <p className="listp"><span className="listspan">Owner:</span> {ownerdata.name}</p>
            </div>

           
            <div className="owners-info">
              <h2>Property Lister Info</h2>
              {ownerdata && ownerdata.name ? (
                <div className='ownerdiv'>
                  <p className='ownerp'><span className='ownerspan'>Name:</span>{ownerdata.name}</p>
                  <p className='ownerp'><span className='ownerspan'>phone:</span>{ownerdata.phone}</p>
                  <p className='ownerp'><span className='ownerspan'>Address</span>{ownerdata.address}</p>
                  <p className='ownerp'><span className='ownerspan'>City:</span>{ownerdata.city}</p>
                  <p className='ownerp'><span className='ownerspan'>Email:</span>{ownerdata.email}</p>
                  <h3>{ownerdata.name}'s other lisiting's</h3>
                  <div className="branchlist">
                    
                    {
                      userslisting.map((item) => (
              <div className="list-items" key={item._id}>
                <img src={`${url}/itemimage/${item.image}`} alt={item.name} />
                <p><span className='gg'>Name:</span> {item.name}</p>
                <p><span className='gg'>Location:</span>  {item.location}</p>
                <p><span className='gg'>Price:</span>  ${item.price}/month</p>
                <p><span className='gg'>House type:</span> {item.flattype}</p>
                <p><span className='gg'>person preference:</span>  {item.persontype}</p>
                
              </div>
            ))
                    }
                  </div>
                </div>
              ) : (
                <p>Loading owner data...</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Listing;
