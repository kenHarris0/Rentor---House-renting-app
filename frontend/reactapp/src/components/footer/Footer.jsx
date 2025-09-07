import React from 'react'
import './Footer.css'
const Footer = () => {
  return (
    <div className='footer'>


        <div className="top-footer">
            

  <div className="footer-part">
    <h3>Support</h3>
    <p>Coronavirus (COVID-19) FAQs</p>
    <p>Manage your trips</p>
    <p>Contact Customer Service</p>
    <p>Safety resource centre</p>
  </div>


  <div className="footer-part">
    <h3>Discover</h3>
    <p>Genius loyalty programme</p>
    <p>Seasonal and holiday deals</p>
    <p>Travel articles</p>
    <p>Booking.com for Business</p>
    <p>Traveller Review Awards</p>
    <p>Car hire</p>
    <p>Flight finder</p>
    <p>Restaurant reservations</p>
    <p>Booking.com for Travel Agents</p>
  </div>

  
  <div className="footer-part">
    <h3>Terms and settings</h3>
    <p>Privacy & cookies</p>
    <p>Terms of Service</p>
    <p>Accessibility Statement</p>
    <p>Grievance officer</p>
    <p>Modern Slavery Statement</p>
    <p>Human Rights Statement</p>
  </div>


  <div className="footer-part">
    <h3>Partners</h3>
    <p>Extranet login</p>
    <p>Partner help</p>
    <p>List your property</p>
    <p>Become an affiliate</p>
  </div>

 
  <div className="footer-part">
    <h3>About</h3>
    <p>About Booking.com</p>
    <p>How we work</p>
    <p>Sustainability</p>
    <p>Press centre</p>
    <p>Careers</p>
    <p>Investor relations</p>
    <p>Corporate contact</p>
  </div>
</div>


       <hr />

        <div className="bottom-footer">
 <p>© {new Date().getFullYear()} Rentor. All rights reserved.</p>
  <p>Designed & built with ❤️ by Ken</p>
        </div>
      
    </div>
  )
}

export default Footer
