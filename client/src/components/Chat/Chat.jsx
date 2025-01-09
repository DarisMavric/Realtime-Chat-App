import React, { useContext, useEffect, useRef, useState } from "react";
import icon from "../../Home/user-avatar-male-5.png";
import { FaFileImage } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import "./Chat.css";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { io, Socket } from "socket.io-client";
import test from "./test.jpg";

const Chat = ({ contact }) => {
  const [message, newMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [localImage, setLocalImage] = useState(null);
  const [file, setFile] = useState(null);

  const fileInputRef = useRef(null);

  const socketRef = useRef(null); // Use useRef to persist socket instance

  console.log(socketRef.current);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
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
        });
      if (res) {
        setMessages(res);
      }
    };
    fetchData();
    // Initialize socket only once using useRef
    if (socketRef.current) {
      socketRef.current.disconnect();
      console.log("Disconnected from server");
    }
    socketRef.current = io("localhost:8080");

    socketRef.current.on("connect", () => {
      console.log("Connected to server");

      const connectionData = {
        userId: currentUser?.id,
        socket: socketRef.current.id,
      };

      try {
        socketRef.current.emit("clientData", connectionData);
        socketRef.current.on("recieveMessage", (message) => {
            if(message.userId === contact._id ){
                setMessages((prevMessages) => [...prevMessages, message]);
            }
        });
      } catch (error) {
        console.error("Socket event handling failed:", error);
      }
    });

    // Cleanup the socket connection on component unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        console.log("Disconnected from server");
      }
    };
  }, [contact._id]); // Add currentUser as a dependency

  const sendMessage = async () => {
    if (message.trim() || localImage) {
      const senderMessage = {
        userId: currentUser?.id,
        contactId: contact._id,
        text: message,
        image: localImage,
      };

      const formData = new FormData();

      // Append fields to FormData, including the file (image)
      formData.append("userId", currentUser?.id);
      formData.append("contactId", contact._id);
      formData.append("text", message);
      formData.append("image", file); // If an image is selected, it will be appended here

      const res = await axios.post(
        "http://localhost:8080/api/message/sendMessage",
        formData,
        { withCredentials: true }
      );

      // Use socketRef to emit the message
      socketRef.current.emit("sendMessage", {
        message,
        image: localImage,
        contactId: contact._id,
        userId: currentUser?.id,
      });

      setMessages((prevMessages) => [...prevMessages, senderMessage]);
      newMessage(""); // Clear the input field after sending the message
      setLocalImage(null);
      setFile(null);
    }
  };

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64File = reader.result;
        setLocalImage(base64File); // Set the base64 file to state
      };

      reader.readAsDataURL(selectedFile); // Convert the file to base64 string
    }

    e.target.value = null;
  };

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
          message?.userId === currentUser?.id ? (
            <div className="sender">
              <div className="sender-message">
                {message?.image && (
                  <img
                    src={
                      message?.image.startsWith("data:image")
                        ? message?.image
                        : `/images/${message?.image}`
                    }
                    alt=""
                  />
                )}
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
                {message?.image && (
                  <img
                    src={
                      message?.image.startsWith("data:image")
                        ? message?.image
                        : `/images/${message?.image}`
                    }
                    alt=""
                  />
                )}
                <p>{message?.text}</p>
              </div>
            </div>
          )
        )}
      </div>
      <div className="send-message">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => newMessage(e.target.value)}
        />
        <FaFileImage
          style={{ width: 40, height: 40, cursor: "pointer" }}
          onClick={() => fileInputRef.current.click()}
        />
        <IoIosSend style={{ width: 40, height: 40 }} onClick={sendMessage} />
        <input
          type="file"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Chat;
