import React from "react";
import "./Home.css";
import Navbar from "../components/Navbar/Navbar";
import Chat from "../components/Chat/Chat";
import Contacts from "../components/Contacts/Contacts";
import Welcome from "../components/Welcome/Welcome";

const Home = () => {

  return (
      <div className="chatter">
        <div className="chat-and-contacts">
          <Contacts/>
          <Welcome />
          <Chat/>
        </div>
      </div>
  );
};

export default Home;
