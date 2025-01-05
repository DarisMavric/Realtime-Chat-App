import React, { useState } from "react";
import "./Navbar.css";
import { FaUserFriends } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { RiLogoutBoxFill } from "react-icons/ri";
import { FaSnapchat } from "react-icons/fa6";
import { BsChatRightDots } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <div className="logo-and-links">
        <div className="logo">
          <FaSnapchat />
        </div>
        <div className="links">
          <ul>
            <li
              onClick={() => navigate('/')}
              className={window.location.pathname === "/" ? "active" : ""}
            >
              <BsChatRightDots />
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-footer">
        <div className="links">
          <ul>
            <li>
              <RiLogoutBoxFill />
            </li>
            <li
              onClick={() => navigate('/profile')}
              className={window.location.pathname === "/profile" ? "active" : ""}
            >
              <CgProfile />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
