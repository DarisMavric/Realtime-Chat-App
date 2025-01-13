import React, { useContext, useEffect, useState } from "react";
import icon from "../../Home/user-avatar-male-5.png";
import { FaUserFriends } from "react-icons/fa";
import { IoChatbox } from "react-icons/io5";
import "./Groups.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";

const Groups = ({ setGroup }) => {
  const { currentUser } = useContext(AuthContext);
  const [messages,setMessages] = useState([]);


  const { data, isLoading } = useQuery({
    queryFn: () =>
      axios.get("http://localhost:8080/api/group/findGroup",{params: {id: currentUser?.id}})
        .then((e) => {
        return e.data;
      }),
    queryKey: ["groups"],
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

  console.log(data);


  



  return (
    <div className="contacts">
      <div className="all-contacts">
        <h1>Groups</h1>
        <button>create group</button>
        <hr />
      </div>
      {data?.map(
        (group) =>
          (
            <div
              className="contact"
              onClick={() => setGroup(group)}
            >
              <div className="contact-image">
                <img src={icon} alt="" />
              </div>
              <div className="contact-name">
                <h2>{group?.name}</h2>
                <p>{messages[group?._id+'-'+currentUser?.id]?.text || messages[currentUser?.id+'-'+group?._id]?.text}</p>
              </div>
            </div>
          )
      )}
    </div>
  );
};

export default Groups;
