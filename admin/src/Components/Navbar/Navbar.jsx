import React from 'react'
import "./Navbar.scss"
import profileImage from '../../assets/profileImage.png'
const Navbar = () => {
  return (
    <div className='navbar'>
        <h1 className='shopname'>TT<span className='shopname'>SHOP</span></h1>
        <img src={profileImage} className='nav-profile' alt=''/>
    </div>
  )
}

export default Navbar