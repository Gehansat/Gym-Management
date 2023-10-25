import React from 'react'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import "./Common.css"

function About() {
  return (
    <div>
      <Header/>
      <div className='about-us'>
        <center><h1>About Us</h1></center>
      </div>
      <Footer/>
    </div>
  )
}

export default About
