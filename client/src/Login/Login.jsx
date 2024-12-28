import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { IoChatbox } from "react-icons/io5";
import "./Login.css";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login-page">
      <Navbar />
      <div className="login-section">
        <div className="login-form">
          <div className="login-form-header">
            <IoChatbox style={{ width: 100, height: 100 }} />
            <h1>Welcome Back</h1>
            <p>Sign in to your account</p>
          </div>
          <div className="login-form-body">
            <label for="email">Email</label>
            <div className="input-container">
              <input type="text" name="email" />
              <MdEmail className="icon" />
            </div>
            <label for="password">Password</label>
            <div className="input-container">
              <input type="password" name="password" />
              <FaLock className="icon" />
            </div>
            <button>Sign in</button>
          </div>
          <div className="login-form-footer">
            <p>
              Don't have an account?<Link to="/signup" className="link">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
