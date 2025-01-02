import React from "react";
import { IoChatbox } from "react-icons/io5";
import "./Welcome.css"

const Welcome = () => {
  return (
    <div className="welcome">
      <IoChatbox style={{ width: 100, height: 100 }} />
      <h1>Welcome To Chatter</h1>
      <p>Select a conversation from the sidebar to start chatting</p>
    </div>
  );
};

export default Welcome;
