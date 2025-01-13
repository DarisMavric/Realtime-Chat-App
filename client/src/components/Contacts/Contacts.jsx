import React, { useContext, useEffect, useState } from "react";
import icon from "../../Home/user-avatar-male-5.png";
import { FaUserFriends } from "react-icons/fa";
import { IoChatbox } from "react-icons/io5";
import "./Contacts.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";

const Contacts = ({ setChat }) => {
  const { currentUser } = useContext(AuthContext);
  const [messages,setMessages] = useState({});

  const { data, isLoading } = useQuery({
    queryFn: () =>
      axios.get("http://localhost:8080/api/user/getUsers").then((e) => {
        return e.data;
      }),
    queryKey: ["users"],
  });

  useEffect(() => {
    const findContacts = async() => {
      const res = await axios.get("http://localhost:8080/api/user/getUsers").then((e) => {
        return e.data;
      })
  
      if(res) {
        console.log(res)
      }
    }
  
    const groupMessages = async() => {
      const res = await axios.post("http://localhost:8080/api/message/getMessages")
      .then((e) => {
        return e.data;
      });
  
      if(res) {
        setMessages(res);
      }
    }
  
    groupMessages();
    findContacts();

  },[currentUser?.id])


  return (
    <div className="contacts">
      <div className="all-contacts">
        <h1>Contacts</h1>
        <hr />
      </div>
      {data?.map(
        (user) =>
          user._id !== currentUser?.id && (
            <div
              className="contact"
              onClick={() => setChat(user)}
            >
              <div className="contact-image">
                <img src={`/images/${user?.image}`} alt="" />
              </div>
              <div className="contact-name">
                <h2>{user?.fullName}</h2>
                <p>{messages[user?._id+'-'+currentUser?.id]?.text || messages[currentUser?.id+'-'+user?._id]?.text}</p>
              </div>
            </div>
          )
      )}
    </div>
  );
};

export default Contacts;
