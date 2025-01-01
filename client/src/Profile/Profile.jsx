import React from "react";
import Navbar from "../components/Navbar/Navbar";
import icon from "../Home/user-avatar-male-5.png";
import { IoPerson } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { MdAddAPhoto } from "react-icons/md";
import "./Profile.css";

const Profile = () => {

  const fileInputRef = React.useRef(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger the file input click
    }
  };


  return (
    <div className="profile-page">
      <Navbar />
      <div className="profile-section">
        <div className="profile-form">
          <div className="profile-form-title">
            <h1>Profile</h1>
            <p>Your profile information</p>
          </div>
          <div className="profile-form-header">
            <div className="change-image">
              <div className="image">
                <img src={icon} alt="" style={{ width: 150, height: 150 }} />
                <div className="change" onClick={handleClick}>
                  <MdAddAPhoto className="button-change"/>
                  <input type="file" style={{display: "none"}} ref={fileInputRef}/>
                </div>
              </div>
            </div>
            <p>Click the camera icon to update your photo</p>
          </div>
          <div className="profile-form-body">
            <label for="fullName">
              <IoPerson />
              Full Name
            </label>
            <input type="text" name="fullName" value="Daris Mavric" />
            <label for="email">
              <MdEmail />
              Email
            </label>
            <input type="email" name="email" value="mvrcdaris@gmail.com" />
          </div>
          <div className="profile-info">
            <h1>Account Information</h1>
            <div className="info">
              <div className="member-since">
                <p>Member Since</p>
                <p>2024-12-29</p>
              </div>
              <hr />
              <div className="account-status">
                <p>Account Status</p>
                <p className="status">Active</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
