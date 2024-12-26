import React from 'react'
import icon from './Chatter.png'
import "./Navbar.css"
import { FaUserFriends } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { RiLogoutBoxFill } from "react-icons/ri";

const Navbar = () => {
  return (
    <div className="navbar">
        <div className="logo">
            <img src={icon} alt="Logo" />
        </div>
        <div className="links">
          <ul>
            <li><FaUserFriends style={{width: 35,height: 35}}/><p>Add Friend</p></li>
            <li><CgProfile style={{width: 35,height: 35}}/><p>Profile</p></li>
            <li><RiLogoutBoxFill style={{width: 35,height: 35}}/><p>Logout</p></li>
          </ul>
        </div>
    </div>
  )
}

export default Navbar