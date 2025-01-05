import React, { useContext } from "react";
import icon from "../../Home/user-avatar-male-5.png";
import { FaUserFriends } from "react-icons/fa";
import { IoChatbox } from "react-icons/io5";
import "./Contacts.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";

const Contacts = ({ setChatID }) => {
  const { currentUser } = useContext(AuthContext);

  const { data, isLoading } = useQuery({
    queryFn: () =>
      axios.get("http://localhost:8080/api/user/getUsers").then((e) => {
        return e.data;
      }),
    queryKey: ["users"],
  });

  console.log(data);

  return (
    <div className="contacts">
      <div className="all-contacts">
        <h1>Contacts</h1>
        <hr />
      </div>
      {data?.map((user) => (
        <div className="contact" onClick={() => setChatID(user._id)}>
          <div className="contact-image">
            <img src={`/images/${user?.image}`} alt="" />
          </div>
          <div className="contact-name">
            <h2>{user?.fullName}</h2>
            <p>{user?.about ? user.about : "Hey there"}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Contacts;
