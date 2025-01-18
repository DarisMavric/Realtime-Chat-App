import React, { useContext, useState } from "react";
import "./Navbar.css";
import { CgProfile } from "react-icons/cg";
import { RiLogoutBoxFill } from "react-icons/ri";
import { IoChatbox } from "react-icons/io5";
import { BsChatRightDots } from "react-icons/bs";
import { MdGroup } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

const Navbar = () => {
  
  const navigate = useNavigate();

  const {currentUser,setCurrentUser} = useContext(AuthContext);

  const logOut = () => {
    document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.clear();

    setCurrentUser(null)
    navigate('/Login');
  }

  return (
    <div className="navbar">
      <div className="logo-and-links">
        <div className="logo">
          <IoChatbox />
        </div>
        <div className="links">
          <ul>
            <li
              onClick={() => navigate('/')}
              className={window.location.pathname === "/" ? "active" : ""}
            >
              <BsChatRightDots />
            </li>
            <li
              onClick={() => navigate('/groups')}
              className={window.location.pathname === "/groups" ? "active" : ""}
            >
              <MdGroup />
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-footer">
        <div className="links">
          <ul>
            <li>
              <RiLogoutBoxFill  onClick={() => logOut()}/>
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
