import React, { useEffect, useState } from 'react';
import icon from "../../Home/user-avatar-male-5.png";
import './createGroup.css';
import { MdClose } from "react-icons/md";
import axios from 'axios';
import {useFormik} from 'formik'
import * as Yup from "yup";

const CreateGroup = ({ setIsModalOpen, isModalOpen }) => {
  // State to store users, search query, and added users
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [addedUsers, setAddedUsers] = useState([]);  // State to store the added users\
  const [addedUsersId,setAddedUsersId] = useState([]);
  const [addedUserNames,setAddedUserNames] = useState([]);


  // Fetch users from the API
  useEffect(() => {
    const findContacts = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/user/getUsers");
        if (res.data) {
          setUsers(res.data);  // Set the users fetched from the API
          setFilteredUsers(res.data);  // Set filtered users initially as all users
        }
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };

    findContacts();
  }, []);  // Empty array ensures this runs once when the component mounts

  // Handle the search input change
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter users based on search query
    setFilteredUsers(
      users.filter((user) => user?.fullName?.toLowerCase().includes(query))
    );
  };

  // Add user to the added users list
  const handleAddUser = (user) => {
    // Prevent adding a user that's already in the added users list by checking their ID
    if (!addedUsers.find((addedUser) => addedUser._id === user._id)) {
      // Add the user object to addedUsers array
      setAddedUsers((prevAddedUsers) => [...prevAddedUsers, user]);
      
      // Add the user's ID (as a string) to addedUsersId array
      setAddedUsersId((prevIds) => [...prevIds, user._id]);
      
      // Add the user's fullName to addedUserNames array
      setAddedUserNames((prevNames) => [...prevNames, user.fullName]);
    }
  };

  // Remove user from the added users list
  const handleRemoveUser = (removeUser) => {
    setAddedUsers((prevAddedUsers) =>
      prevAddedUsers.filter((user) => user._id !== removeUser._id)
    );
  
    setAddedUsersId((prevAddedUsersId) =>
      prevAddedUsersId.filter((userId) => userId !== removeUser._id)
    );
  
    setAddedUserNames((prevAddedUserNames) =>
      prevAddedUserNames.filter((fullName) => fullName !== removeUser.fullName)
    );
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      image: "",
    },

    enableReinitialize: true,

    validationSchema: Yup.object({
      name: Yup.string()
        .required("Name of Group is Required!")
        .min(3, "Minimum length of Group Name should be 3 characters!"),
    }),


    onSubmit: async (values) => {


      
      const formData = new FormData();

  // Append fields to FormData, including the file (image)
      formData.append("name", formik.values.name);
      formData.append("image", formik.values.image);  // If an image is selected, it will be appended here
      addedUsersId.forEach(id => {
        formData.append("users[]", id);
      });  // Serialize addedUsers to JSON string
      addedUserNames.forEach(name => {
        formData.append("usernames[]", name);
      });
      try {
        const res = await axios.post("http://localhost:8080/api/group/createGroup", formData, {
          withCredentials: true
        });

        setIsModalOpen(false);
      }catch(err){
        console.log(err)
      }
    },
  });

  // Function to close the modal
  const closeModal = (e, clickedOutside = false) => {
    if (clickedOutside && e.target.classList.contains('modal-overlay')) {
      setIsModalOpen(false);
    } else {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="create-group modal">
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-wrapper">
            <div className="modal-header">
              <h1>Create New Group</h1>
              <MdClose className="close-modal-btn" onClick={(e) => closeModal(e)} />
            </div>
            <div className="modal-content">
              <input type="text" name="name" value={formik.values.name} placeholder="Group Name" onChange={formik.handleChange}/>
              <input
                type="text"
                name="adduser"
                placeholder="Search User"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <div className="added-users">
                {/* Display added users */}
                {addedUsers.map((user) => (
                  <div key={user._id} className="added-user">
                    <span>{user.fullName}</span>
                    <MdClose onClick={() => handleRemoveUser(user)} className="remove-user-btn" style={{width: "20px",height: "20px",cursor: "pointer"}}/>
                  </div>
                ))}
              </div>

              {/* Display filtered users */}
              <div className="user-list">
                {filteredUsers.length === 0 ? (
                  <p>No users found</p>
                ) : (
                  filteredUsers.map((user) => (
                    <div key={user._id} className="user" onClick={() => handleAddUser(user)}>
                      <div className="image">
                        <img
                          src={`/images/${user?.image}`}
                          alt={user?.fullName || 'User Avatar'}
                          style={{ objectFit: 'cover', height: '100%', width: '100%' }}
                        />
                      </div>
                      <div className="name-bio">
                        <h1>{user?.fullName || 'Unknown User'}</h1>
                        <p>{user?.about || 'No bio available'}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="button">
                <p onClick={formik.handleSubmit}>Create Group</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateGroup;
