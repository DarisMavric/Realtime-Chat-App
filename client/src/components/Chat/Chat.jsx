import React, { useContext, useEffect, useState } from "react";
import icon from "../../Home/user-avatar-male-5.png";
import { FaFileImage } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import "./Chat.css";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { io } from "socket.io-client";

const Chat = ({ contact }) => {

    const [message,newMessage] = useState('');
    const [messages,setMessages] = useState([])

   const socket = io("localhost:8080");

   socket.on('connect', () => {
    console.log('Connected to server');
    
    // Example data to send to the server
    const connectionData = {
      userId: currentUser?.id,
      socket: socket.id
    };

    // Send data to the server as soon as the connection is established
    socket.emit('clientData', connectionData);
    socket.on('recieveMessage',(message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
    })
  });

  const { currentUser } = useContext(AuthContext);

  useEffect(async() => {
    const res = await axios
        .post(
          "http://localhost:8080/api/message/getMessages",
          {
            userId: currentUser?.id,
            contactId: contact._id,
          },
          { withCredentials: true }
        )
        .then((e) => {
          return e.data;
        })

    if(res){
        setMessages(res);
    }
  },[]);

  const sendMessage = () => {
    if (message.trim()) {
        const senderMessage = {
            userId: currentUser?.id,
            text: message
        }
        socket.emit('sendMessage', { message, contactId: contact._id, userId: currentUser?.id});  // Emit the message to the server
        setMessages((prevMessages) => [...prevMessages, senderMessage]);
        newMessage('');  // Clear the input field after sending the message
    }
  }

  return (
    <div className="chat">
      <div className="chat-title">
        <div className="contact-image">
          <img src={`/images/${contact?.image}`} alt="" />
        </div>
        <div className="contact-name">
          <h2>{contact?.fullName}</h2>
          <p>Online</p>
        </div>
      </div>
      <div className="chat-messages">
      {messages?.map((message) =>
          message?.userId == currentUser?.id ? (
            <div className="sender">
              <div className="sender-message">
                <p>{message?.text}</p>
              </div>
              <div className="sender-image">
                <img src={icon} alt="" />
              </div>
            </div>
          ) : (
            <div className="reciever">
              <div className="reciever-image">
                <img src={icon} alt="" />
              </div>
              <div className="reciever-message">
                <p>{message?.text}</p>
              </div>
            </div>
          )
        )}
      </div>
      <div className="send-message">
        <input type="text" placeholder="Type a message..."  value={message} onChange={(e) => newMessage(e.target.value)}/>
        <FaFileImage style={{ width: 40, height: 40 }} />
        <IoIosSend style={{ width: 40, height: 40 }}  onClick={sendMessage}/>
      </div>
    </div>
  );
};

export default Chat;
