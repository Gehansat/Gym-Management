import React from 'react'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import "./Common.css"

function Contact() {
  return (
    <div>
      <Header/>
      <div className='contact-us'>
        <center><h1>Contact Us</h1></center>
      </div>
      <Footer/>
    </div>
  )
}

export default Contact
