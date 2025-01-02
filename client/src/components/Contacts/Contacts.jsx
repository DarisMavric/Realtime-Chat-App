import React from "react";
import icon from "../../Home/user-avatar-male-5.png";
import { FaUserFriends } from "react-icons/fa";
import { IoChatbox } from "react-icons/io5";
import "./Contacts.css"

const Contacts = ({setChatID}) => {
    const clickedContact = () => {
        console.log('Contact Clicked');
    }
  return (
    <div className="contacts">
      <div className="all-contacts">
        <h1>Contacts</h1>
        <hr />
      </div>
      <div className="contact" onClick={() => setChatID(1)}>
        <div className="contact-image">
          <img src={icon} alt="" />
        </div>
        <div className="contact-name">
          <h2>Daris Mavric</h2>
          <p>Hey there</p>
        </div>
      </div>
      <div className="contact" onClick={() => setChatID(2)}>
        <div className="contact-image">
          <img src={icon} alt="" />
        </div>
        <div className="contact-name">
          <h2>Daris Mavric</h2>
          <p>You: ok</p>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
