import React from "react";
import icon from "../../Home/user-avatar-male-5.png";
import { FaUserFriends } from "react-icons/fa";
import { IoChatbox } from "react-icons/io5";
import "./Contacts.css"

const Contacts = () => {
    const clickedContact = () => {
        console.log('Contact Clicked');
    }
  return (
    <div className="contacts">
      <div className="all-contacts">
        <FaUserFriends style={{ width: 35, height: 35 }} />
        <h1>Contacts</h1>
      </div>
      <hr />
      <div className="contact" onClick={() => clickedContact()}>
        <div className="contact-image">
          <img src={icon} alt="" />
        </div>
        <div className="contact-name">
          <h2>Daris Mavric</h2>
          <p>Online</p>
        </div>
      </div>
      <div className="contact">
        <div className="contact-image">
          <img src={icon} alt="" />
        </div>
        <div className="contact-name">
          <h2>Daris Mavric</h2>
          <p>Online</p>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
