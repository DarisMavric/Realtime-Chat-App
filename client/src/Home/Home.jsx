import React, { useState } from "react";
import "./Home.css";
import Navbar from "../components/Navbar/Navbar";
import Chat from "../components/Chat/Chat";
import Contacts from "../components/Contacts/Contacts";
import Welcome from "../components/Welcome/Welcome";
import Groups from "../components/Groups/Groups";
import GroupChat from "../components/GroupChat/GroupChat";

const Home = () => {
  const [chat, setChat] = useState(null);

  const currentPage = window.location.pathname;

  console.log(currentPage);

  return (
    <div className="home">
      <Navbar />
      <div className="chatter">
        <div className="chat-and-contacts">
          {
            currentPage === "/" ? (
              <>
                <Contacts setChat={setChat} />
                {chat ? <Chat contact={chat} /> : <Welcome />}
              </>
            ) : currentPage === "/groups" ? (
              <>
                <Groups setChat={setChat} />
                {chat ? <GroupChat group={chat} /> : <Welcome />}
              </>
            ) : null // No fallback, return null or don't render anything
          }
        </div>
      </div>
    </div>
  );
};

export default Home;
