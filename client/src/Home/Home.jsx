import React from "react";
import "./Home.css";
import Navbar from "../components/Navbar/Navbar";
import icon from "./user-avatar-male-5.png";
import { FaUserFriends } from "react-icons/fa";
import { IoChatbox } from "react-icons/io5";

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <div className="chatter">
        <div className="chat-and-contacts">
          <div className="contacts">
            <div className="all-contacts">
              <FaUserFriends style={{ width: 35, height: 35 }} />
              <h1>Contacts</h1>
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
          <div className="chat">
            <IoChatbox style={{width: 100,height: 100}}/>
            <h1>Welcome To Chatter</h1>
            <p>Select a conversation from the sidebar to start chatting</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
