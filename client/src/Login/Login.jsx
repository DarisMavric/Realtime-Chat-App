import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { IoChatbox } from "react-icons/io5";
import "./Login.css";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { useFormik } from "formik";
import * as Yup from "yup";

const Login = () => {

  const navigate = useNavigate();

  const { currentUser,login } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, []);

  const [err, setErr] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required("Email is required!")
        .email("Your email is not valid!"),
      password: Yup.string()
        .required("Password is required!")
        .min(5, "Minimum lenght of your password must be 5 characters!"),
    }),

    onSubmit: async () => {
      const data = {
        email: formik.values.email,
        password: formik.values.password,
      };
      try {
        await login(data);
        navigate("/");
      } catch (err) {
        setErr(err.response.data);
        console.log(err);
      }
    },
  });

  return (
    <div className="login-page">
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
              <input type="text" name="email" onChange={formik.handleChange}/>
              <MdEmail className="icon" />
            </div>
            {formik.errors.email && formik.touched.email ? (
                <p className="error">{formik.errors.email}</p>
            ) : null}
            <label for="password">Password</label>
            <div className="input-container">
              <input type="password" name="password" onChange={formik.handleChange}/>
              <FaLock className="icon" />
            </div>
            {formik.errors.password && formik.touched.password ? (
                <p className="error">{formik.errors.password}</p>
            ) : null}
            <button onClick={formik.handleSubmit}>Sign in</button>
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
