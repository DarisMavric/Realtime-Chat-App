import React from "react";
import "./Home.css";
import Navbar from "../components/Navbar/Navbar";
import icon from "./user-avatar-male-5.png";
import { FaUserFriends } from "react-icons/fa";
import { IoChatbox } from "react-icons/io5";
import Chat from "../components/Chat/Chat";
import Contacts from "../components/Contacts/Contacts";

const Home = () => {

  return (
    <div className="home">
      <Navbar />
      <div className="chatter">
        <div className="chat-and-contacts">
          <Contacts/>
          <div className="welcome">
            <IoChatbox style={{width: 100,height: 100}}/>
            <h1>Welcome To Chatter</h1>
            <p>Select a conversation from the sidebar to start chatting</p>
          </div>
          <Chat/>
        </div>
      </div>
    </div>
  );
};

export default Home;
