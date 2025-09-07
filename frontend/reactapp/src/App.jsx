import React, { useContext } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import {Routes,Route} from 'react-router-dom'
import { Rentcontext } from './contexts/Contexts'
import Login from './pages/Login/Login'
import { ToastContainer } from 'react-toastify'
import Profile from './pages/Profile/Profile'
import Listing from './pages/ListingPage/Listing'
import Premium from './pages/Premium/Premium'
import Payment from './pages/redirect/Payment'
const App = () => {
  const {showlogin}=useContext(Rentcontext)
  return (
    <div className='app'>
      <ToastContainer/>
      <Navbar/>
      {showlogin && <Login/>}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/listing/:id' element={<Listing/>}/>
        <Route path='/premium' element={<Premium/>}/>
        <Route path='/verify-premium' element={<Payment/>}/>

      </Routes>
      
    </div>
  )
}

export default App
