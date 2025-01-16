import React, { useContext, useEffect, useState } from "react";
import icon from "../../Home/user-avatar-male-5.png";
import "./Groups.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import CreateGroup from "../CreateGroup/createGroup";
import { CiCirclePlus } from "react-icons/ci";;

const Groups = ({ setGroup }) => {
  const { currentUser } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([]);

  const { data, isLoading } = useQuery({
    queryFn: () =>
      axios
        .get("http://localhost:8080/api/group/findGroup", {
          params: { id: currentUser?.id },
        })
        .then((e) => {
          return e.data;
        }),
    queryKey: ["groups"],
  });

  useEffect(() => {
    const groupMessages = async () => {
      const res = await axios
        .post("http://localhost:8080/api/message/getMessages")
        .then((e) => {
          return e.data;
        });

      if (res) {
        setMessages(res);
      }
    };

    groupMessages();
  }, [currentUser?.id,messages]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="contacts">
      <div className="all-contacts">
        <h1>Groups</h1>
        <button onClick={openModal} className="create-group-btn">Create New Group <CiCirclePlus  style={{fontSize: "30px"}}/></button>
        <CreateGroup
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
        />
        <hr />
      </div>
      {data?.map((group) => {
        const foundKey = Object.keys(messages).find(
          (key) => key.startsWith(group?._id) || key.endsWith(group?._id)
        );
        const messageText = foundKey
          ? messages[foundKey]?.text?.substring(0, 20) + '...'
          : "No message for this group.";

        const messageToShow = messages[foundKey]?.userId === currentUser?.id
          ? `You: ${messageText}...`
          : messageText;

        return (
          <div className="contact" onClick={() => setGroup(group)}>
            <div className="contact-image">
              <img src={icon} alt="" />
            </div>
            <div className="contact-name">
              <h2>{group?.name}</h2>
              <p>{messageToShow}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Groups;
