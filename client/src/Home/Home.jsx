import React, { useState } from "react";
import "./Home.css";
import Navbar from "../components/Navbar/Navbar";
import Chat from "../components/Chat/Chat";
import Contacts from "../components/Contacts/Contacts";
import Welcome from "../components/Welcome/Welcome";

const Home = () => {

  const [chatID,setChatID] = useState(null);

  return (
    <div className="home">
      <Navbar />
      <div className="chatter">
        <div className="chat-and-contacts">
          <Contacts setChatID={setChatID}/>
          {
            chatID ? <Chat chatID={chatID}/> : <Welcome />
          }
        </div>
      </div>
    </div>
  );
};

export default Home;
