import React, { useContext, useEffect, useState } from "react";
import icon from "../../Home/user-avatar-male-5.png";
import "./Groups.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import CreateGroup from "../CreateGroup/createGroup";

const Groups = ({ setGroup }) => {
  const { currentUser } = useContext(AuthContext);
  const [messages,setMessages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users,setUsers] = useState([]);


  const { data, isLoading } = useQuery({
    queryFn: () =>
      axios.get("http://localhost:8080/api/group/findGroup",{params: {id: currentUser?.id}})
        .then((e) => {
        return e.data;
      }),
    queryKey: ["groups"],
  });

  useEffect(() => {
  
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

  },[currentUser?.id])

  const openModal = () => {
    setIsModalOpen(true);
  };


  return (
    <div className="contacts">
      <div className="all-contacts">
        <h1>Groups</h1>
        <button onClick={openModal}>Open Modal</button>
        <CreateGroup setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen}/>
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
