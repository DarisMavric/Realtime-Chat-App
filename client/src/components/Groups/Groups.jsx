import React, { useContext } from "react";
import icon from "../../Home/user-avatar-male-5.png";
import { FaUserFriends } from "react-icons/fa";
import { IoChatbox } from "react-icons/io5";
import "./Groups.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";

const Groups = ({ setChat }) => {
  const { currentUser } = useContext(AuthContext);

  const { data, isLoading } = useQuery({
    queryFn: () =>
      axios.get("http://localhost:8080/api/group/findGroup",{params: {id: currentUser?.id}})
        .then((e) => {
        return e.data;
      }),
    queryKey: ["groups"],
  });


  if(data) {
    console.log(data);
  }

  return (
    <div className="contacts">
      <div className="all-contacts">
        <h1>Contacts</h1>
        <hr />
      </div>
      {data?.map(
        (group) =>
          (
            <div
              className="contact"
              onClick={() => setChat(group)}
            >
              <div className="contact-image">
                <img src={`/images/${group?.image}`} alt="" />
              </div>
              <div className="contact-name">
                <h2>{group?.name}</h2>
                <p>{group?.about ? group.about : "Hey there"}</p>
              </div>
            </div>
          )
      )}
    </div>
  );
};

export default Groups;
