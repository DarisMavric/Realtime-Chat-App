import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import { IoChatbox } from "react-icons/io5";
import "./Login.css"

const Login = () => {
  return (
    <div className="login-page">
      <Navbar/>
      <div className="login-section">
        <div className="login-form">
          <div className="login-form-header">
            <IoChatbox style={{width: 100,height: 100}}/>
            <h1>Welcome Back</h1>
            <p>Sign in to your account</p>
          </div>
          <div className="login-form-body">
            <label for="email">Email</label>
            <input type="text" name='email'/>
            <label for="password">Password</label>
            <input type="password" name='password'/>
            <button>Sign in</button>
          </div>
          <div className="login-form-footer">
            <p>Don't have an account?<a href="">Create account</a></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login