import React from "react";
import icon from "./Chatter.png";
import "./Navbar.css";
import { FaUserFriends } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { RiLogoutBoxFill } from "react-icons/ri";
import { FaSnapchat } from "react-icons/fa6";
import { BsChatRightDots } from "react-icons/bs";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo-and-links">
        <div className="logo">
          <FaSnapchat/>
        </div>
        <div className="links">
          <ul>
            <li>
              <FaUserFriends />
            </li>
            <li>
              <CgProfile />
            </li>
            <li>
              <RiLogoutBoxFill />
            </li>
            <li>
              <BsChatRightDots />
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-footer">
      <div className="links">
          <ul>
            <li>
              <FaUserFriends />
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
