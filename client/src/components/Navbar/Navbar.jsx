import React from 'react'
import icon from './Chatter.png'
import "./Navbar.css"
import { FaUserFriends } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { RiLogoutBoxFill } from "react-icons/ri";
import { IoChatbox } from "react-icons/io5";

const Navbar = () => {
  return (
    <div className="navbar">
        <div className="logo">
            <IoChatbox style={{width: 45,height: 45}}/>
            <h1>Chatter</h1>
        </div>
        <div className="links">
          <ul>
            <li><FaUserFriends style={{width: 25,height: 25}}/><p>Add Friend</p></li>
            <li><CgProfile style={{width: 25,height: 25}}/><p>Profile</p></li>
            <li><RiLogoutBoxFill style={{width: 25,height: 25}}/><p>Logout</p></li>
          </ul>
        </div>
    </div>
  )
}

export default Navbar
