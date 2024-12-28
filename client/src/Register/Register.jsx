import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { IoPerson } from "react-icons/io5";
import { IoChatbox } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import "./Register.css"
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="register-page">
      <Navbar />
      <div className="register-section">
        <div className="register-form">
          <div className="register-form-header">
            <IoChatbox style={{ width: 100, height: 100 }} />
            <h1>Create Account</h1>
            <p>Get started with your free account</p>
          </div>
          <div className="register-form-body">
            <label for="fullName">Full Name</label>
            <div className="input-container">
                <input type="text" name="fullName"/>
                <IoPerson className="icon"/>
            </div>
            <label for="email">Email</label>
            <div className="input-container">
                <input type="text" name="email" />
                <MdEmail className="icon"/>
            </div>
            <label for="password">Password</label>
            <div className="input-container">
                <input type="password" name="password" />
                <FaLock className="icon"/>
            </div>
            <button>Sign Up</button>
          </div>
          <div className="register-form-footer">
            <p>
              Already have an account?<Link to="/login" className="link">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
