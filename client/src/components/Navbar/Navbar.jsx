import React, { useState } from "react";
import "./Navbar.css";
import { FaUserFriends } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { RiLogoutBoxFill } from "react-icons/ri";
import { FaSnapchat } from "react-icons/fa6";
import { BsChatRightDots } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Navbar = ({setActivePage}) => {
  const [activeIndex, setActiveIndex] = useState(null); // Track the active item index

  const handleClick = (index) => {
    setActiveIndex(index); // Set the active item index on click
  };

  return (
    <div className="navbar">
      <div className="logo-and-links">
        <div className="logo">
          <FaSnapchat />
        </div>
        <div className="links">
          <ul>
            <li
              onClick={() => {setActivePage('home'); setActiveIndex(0);}}
              className={activeIndex === 0 ? "active" : ""}
            >
              <FaUserFriends />
            </li>
            <li
              onClick={() => {setActivePage('profile'); setActiveIndex(1)}}
              className={activeIndex === 1 ? "active" : ""}
            >
              <CgProfile />
            </li>
            <li
              onClick={() => handleClick(3)}
              className={activeIndex === 3 ? "active" : ""}
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
            <li>
              <CgProfile />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
