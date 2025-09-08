import React, { useContext,useEffect,useState } from 'react'
import './Profile.css'
import {Rentcontext} from '../../contexts/Contexts'
import axios from 'axios'
import { toast } from 'react-toastify'
const Profile = () => {
  const {userdata,alllistings, setalllistings,url, getalllistings,setuserdata,fetchuserdata}=useContext(Rentcontext)

const [listingdata, setlistingdata] = useState({
  name: "",
  image: "",
  flattype: "1bhk",
  persontype: "bachelor", 
  housetype: "pg",
  price: "",
  location: "",
  facilities: "westernBath",
  

});


const[userslisting,setuserslisting]=useState([])


const fetchuserlistings=()=>{
  const userListings=alllistings.filter(item=>
  userdata?.listings?.includes(item._id))
  setuserslisting(userListings)


}



const handlechange = (e) => {
  const { name, value, files } = e.target;

  if (name === "image") {
    
    setlistingdata((data) => ({ ...data, image: files[0] }));
  } else {
    setlistingdata((data) => ({ ...data, [name]: value }));
  }
};


const handlesubmit = async (e) => {
  e.preventDefault(); 

  try {
    const formData = new FormData();
    formData.append("image", listingdata.image);
    formData.append("name", listingdata.name);
    formData.append("flattype", listingdata.flattype);
    formData.append("persontype", listingdata.persontype);
    formData.append("housetype", listingdata.housetype);
    formData.append("price", listingdata.price);
    formData.append("location", listingdata.location);
    formData.append("facilities", listingdata.facilities);
    

    const response = await axios.post(
      url+"/item/additem",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true, 
      }
    );
if(response.data.success){
  toast.success(`property listed successfully ${userdata?.name}`);
   await getalllistings(); 
  await fetchuserdata();
}

   
  } catch (err) {
    console.error("Upload failed", err);
    toast.error("listing failed server error")
  }
};

// to remove an item from lisitng

const removeIndividualitem=async(id)=>{
  try{
    const response=await axios.post(url+'/item/remove',{itemid:id},{withCredentials:true})
    if(response.data.success){
      toast.success("listing deleted")
      await getalllistings()
      await fetchuserdata()
    }

  }
  catch{
toast.error("failed to delete lisiting")
  }

}







useEffect(()=>{
  fetchuserlistings()
},[userdata,alllistings])


  return (
    <div className='profile'>
 
 <div className="profile-cont">
 <div className='prof'>
  {userdata?.name ? userdata.name[0].toUpperCase() : "?"}
</div>

  <div className="details">
    <p><span className='topichead'>Email:</span> {userdata.email}</p>
    <p><span className='topichead'>Address:</span> {userdata.address}</p>
    <p><span className='topichead'>Phone:</span> {userdata.phone}</p>
    <p><span className='topichead'>City:</span> {userdata.city}</p>
  </div>
 </div>



<div className="user-choice">



 <div className="add-listing">
  <h1>Add your listing</h1>


  <form className='addlisting-form' onSubmit={handlesubmit}>
    
    <div className="optns">
<label htmlFor="houseimg">House image</label>
    <input type="file" id='houseimg'  name='image' onChange={handlechange}  />
    </div>

    <div className="optns">
      <label htmlFor="name">Name</label>
      <input type="text" placeholder='Name' id='name' value={listingdata.name} name='name' onChange={handlechange}  />

    </div>

   <div className='optns'>
            <label htmlFor='house-type'>Flat Type</label>
            <select id='house-type' name='flattype' value={listingdata.flattype}  onChange={handlechange}>
                <option value="1bhk">1 BHK</option>
                <option value="2bhk">2 BHK</option>
                <option value="3bhk">3 BHK</option>
            </select>
            </div>


           <div className="optns">
            <label htmlFor="indi-type">Person</label>
            <select id='indi-type' name='persontype' value={listingdata.persontype} onChange={handlechange} >
                <option value="bachelor">Bachelor</option>
                 <option value="family">Family</option>
            </select>
           </div>
            
           <div className="optns">
            <label htmlFor="type">House Type</label>
             <select id='type' name='housetype' value={listingdata.housetype} onChange={handlechange}>
                <option value="pg">Pg/Hostel</option>
                <option value="roomsharing">Roomsharing</option>
                <option value="rent">Rent</option>
            </select>
           </div>

<div className="optns">
    <label htmlFor="price">Price</label>
      <input type='text' id='price' placeholder='Price range' name='price' value={listingdata.price}  onChange={handlechange} />
</div>
<div className="optns">
    <label htmlFor="location">Location</label>
     <input type='text' id='location' placeholder='Area/ location' name='location' value={listingdata.location}  onChange={handlechange} />
</div>
          
           


            <div className="optns">
                <label htmlFor="facilities">Facilities</label>
            <select id='facilities' name='facilities' value={listingdata.facilities} onChange={handlechange}>
                <option value="westernBath">Western bathroom</option>
                <option value="parking">Parking</option>
                <option value="pets">Pets</option>
                <option value="Maintanance">Maintanance</option>
            </select>
            </div>



 <button type='submit' >Add</button>
  </form>

 </div>




<div className="show-listing">
          <p className='phead'> {userdata.name} Listings</p>
          <div className="users-listing">
            {userslisting.map((item) => (
              <div className="list-items" key={item._id}>
                <img src={`${url}/itemimage/${item.image}`} alt={item.name} />
                <p><span className='gg'>Name:</span> {item.name}</p>
                <p><span className='gg'>Location:</span>  {item.location}</p>
                <p><span className='gg'>Price:</span>  ${item.price}/month</p>
                <p><span className='gg'>House type:</span> {item.flattype}</p>
                <p><span className='gg'>person preference:</span>  {item.persontype}</p>
                <button onClick={()=>removeIndividualitem(item._id)}>Remove</button>
              </div>
            ))}
          </div>
        </div>



</div>



      
    </div>
  )
}

export default Profile
