import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { IoPerson } from "react-icons/io5";
import { IoChatbox } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import {useFormik} from 'formik'
import * as Yup from "yup";
import { AuthContext } from "../Context/AuthContext";

const Register = () => {
  const navigate = useNavigate();

  const { currentUser,register } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, []);

  const [err, setErr] = useState("");

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
    },

    validationSchema: Yup.object().shape({
      fullName: Yup.string()
        .required("Full Name is required!")
        .min(3, "Minimum lenght of your Full Name must be 3 characters!"),
      email: Yup.string()
        .required("Email is required!")
        .email("Your email is not valid!"),
      password: Yup.string()
        .required("Password is required!")
        .min(5, "Minimum lenght of your password must be 5 characters!"),
    }),

    onSubmit: async () => {
      const data = {
        fullName: formik.values.fullName,
        email: formik.values.email,
        password: formik.values.password,
      };
      try {
        await register(data);
        navigate("/");
      } catch (err) {
        setErr(err.response.data);
        console.log(err);
      }
    },
  });



  return (
    <div className="register-page">
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
              <input type="text" name="fullName" onChange={formik.handleChange}/>
              <IoPerson className="icon" />
            </div>
            <label for="email">Email</label>
            <div className="input-container">
              <input type="text" name="email" onChange={formik.handleChange}/>
              <MdEmail className="icon" />
            </div>
            <label for="password">Password</label>
            <div className="input-container">
              <input type="password" name="password" onChange={formik.handleChange}/>
              <FaLock className="icon" />
            </div>
            <button onClick={formik.handleSubmit}>Sign Up</button>
          </div>
          <div className="register-form-footer">
            <p>
              Already have an account?
              <Link to="/login" className="link">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
