import React, { useContext, useEffect, useRef, useState } from "react";
import icon from "../../Home/user-avatar-male-5.png";
import { FaFileImage } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import "./GroupChat.css";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { io, Socket } from "socket.io-client";
import test from "../Chat/test.jpg"

const GroupChat = ({ group }) => {
  const [message, newMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [localImage, setLocalImage] = useState(null);
  const [file, setFile] = useState(null);

  const fileInputRef = useRef(null);

  const socketRef = useRef(null); // Use useRef to persist socket instance

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios
        .post(
          "http://localhost:8080/api/message/getMessages",
          {
            groupId: group?._id
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

      const groupData = {
        socket: socketRef.current.id,
        userId: currentUser?.id,
        groupId: group._id
      };

      try {
        socketRef.current.emit("groupData", groupData);
        socketRef.current.on("recieveGroupMessage", (message) => {
            
                setMessages((prevMessages) => [...prevMessages, message]);
                console.log(message);
            
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
  }, [group._id,currentUser]); // Add currentUser as a dependency

  const sendMessage = async () => {
    if (message.trim() || localImage) {
      const senderMessage = {
        userId: currentUser?.id,
        groupId: group._id,
        text: message,
        image: localImage,
        username: currentUser?.fullName
      };

      const formData = new FormData();

      // Append fields to FormData, including the file (image)
      formData.append("userId", currentUser?.id);
      formData.append("groupId", group._id);
      formData.append("text", message);
      formData.append("image", file); // If an image is selected, it will be appended here

      const res = await axios.post(
        "http://localhost:8080/api/message/sendMessage",
        formData,
        { withCredentials: true }
      ); 

      // Use socketRef to emit the message
      socketRef.current.emit("sendGroupMessage", {
        message,
        image: localImage,
        groupId: group._id,
        userId: currentUser?.id,
        username: currentUser?.fullName
      });

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
    <div className="group">
      <div className="group-title">
        <div className="group-image">
          {message?.image && (
              <img src={`/images/${message?.image}`} alt="" />
          )}
        </div>
        <div className="group-name">
          <h2>{group?.name}</h2>
          <p>{group?.usernames.join(", ")}</p>
        </div>
      </div>
      <div className="group-messages">
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
            </div>
          ) : (
            <div className="reciever">
              <div className="reciever-message">
              <div className="reciever-name">{message?.username}</div>
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

export default GroupChat;
