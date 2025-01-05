import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import icon from "../Home/user-avatar-male-5.png";
import { IoPerson } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { MdAddAPhoto } from "react-icons/md";
import "./Profile.css";
import Welcome from "../components/Welcome/Welcome";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../Context/AuthContext";
import {useFormik} from 'formik'
import * as Yup from "yup";
import axios from "axios";

const Profile = () => {

  const fileInputRef = React.useRef(null);

  const [err, setErr] = useState("");
  const [file, setFile] = useState(null);

  const {currentUser} = useContext(AuthContext);

  const { data, isLoading } = useQuery({
    queryFn: () =>
      axios.get("http://localhost:8080/api/user/getUsers",{
        params: {id: currentUser?.id}
      }).then((e) => {
        return e.data;
      }),
    queryKey: ["user"],
  });

  const formik = useFormik({
      initialValues: {
        fullName: data?.fullName || "",
        image: data?.image,
        about: data?.about || ""
      },

      enableReinitialize: true,

      validationSchema: Yup.object({
        fullName: Yup.string()
          .required("Full Name is required!")
          .min(3, "Minimum length of Full Name must be 3 characters!"),
      }),

  
      onSubmit: async (values) => {
        
        const formData = new FormData();

    // Append fields to FormData, including the file (image)
        formData.append("id", currentUser?.id);
        formData.append("fullName", formik.values.fullName);
        formData.append("image", formik.values.image);  // If an image is selected, it will be appended here
        formData.append("about", formik.values.about);
        try {
          const res = await axios.post("http://localhost:8080/api/user/editUser", formData, {
            // Don't manually set `Content-Type`, axios will do this when sending FormData
          });

          console.log(res.data);
        }catch(err){
          setErr(err);
          console.log(err)
        }
      },
    });

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger the file input click
    }
  };

  const handleChange = (e) => {
    formik.setFieldValue('image', e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
  };


  return (
    <div className="profile-page">
      <Navbar />
      <div className="profile-section">
        <div className="profile-form">
          <div className="profile-form-title">
            <h1>Profile</h1>
            <hr />
          </div>
          <div className="profile-form-header">
            <div className="change-image">
              <div className="image">
                <img src={file ? file : `/images/${data?.image}` || icon}  alt="" style={{ width: 150, height: 150 }} />
                <div className="change" onClick={handleClick}>
                  <MdAddAPhoto className="button-change"/>
                  <input type="file" style={{display: "none"}} ref={fileInputRef} onChange={handleChange}/>
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
            <input type="text" name="fullName" value={formik.values.fullName} onChange={formik.handleChange}/>
            {formik.touched.fullName && formik.errors.fullName && (
              <div style={{ color: "red" }}>{formik.errors.fullName}</div>
            )}
            <label for="email">
              <MdEmail />
              Email
            </label>
            <input type="email" name="email" defaultValue={data?.email} disabled/>
            <label for="about">
              <MdEmail />
              About
            </label>
            <textarea name="about" defaultValue={data?.about} rows="5" onChange={formik.handleChange}/>
            <button onClick={formik.handleSubmit}>UPDATE PROFILE</button>
          </div>
          <div className="profile-info">
            <h1>Account Information</h1>
            <div className="info">
              <div className="member-since">
                <p>Member Since</p>
                <p>{data?.createdAt}</p>
              </div>
              <hr />
              <div className="account-status">
                <p>Account Status</p>
                <p className="status">Active</p>
              </div>
            </div>
          </div>
        </div>
        <Welcome />
      </div>
    </div>
  );
};

export default Profile;
