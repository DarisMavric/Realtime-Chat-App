import React from 'react'
import icon from "../../Home/user-avatar-male-5.png";
import { FaFileImage } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import "./Chat.css"

const Chat = () => {
  return (
    <div className="chat">
        <div className="chat-title">
            <div className="contact-image">
                <img src={icon} alt="" />
            </div>
            <div className="contact-name">
                <h2>Daris Mavric</h2>
                <p>Online</p>
            </div>
        </div>
        <div className="chat-messages">
            <div className="sender">
                <div className="sender-message">
                    <p>asdasdasdasdasdddddddddddddddddddddddddd</p>
                </div>
                <div className="sender-image">
                    <img src={icon} alt="" />
                </div>
            </div>
            <div className="reciever">
                <div className="reciever-image">
                    <img src={icon} alt="" />
                </div>
                <div className="reciever-message">
                    <p>asdasdasdasdasdddddddddddddddddddddddddd</p>
                </div>
            </div>
        </div>
        <div className="send-message">
            <input type="text" placeholder='Type a message...'/>
            <FaFileImage style={{width: 40,height: 40}}/>
            <IoIosSend style={{width: 40,height: 40}}/>
        </div>
    </div>
  )
}

export default Chat