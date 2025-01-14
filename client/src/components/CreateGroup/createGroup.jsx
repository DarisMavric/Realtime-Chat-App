import React, { useEffect, useState } from 'react';
import icon from "../../Home/user-avatar-male-5.png";
import './createGroup.css';
import { MdClose } from "react-icons/md";
import axios from 'axios';

const CreateGroup = ({ setIsModalOpen, isModalOpen }) => {
  // State to store users, search query, and added users
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [addedUsers, setAddedUsers] = useState([]);  // State to store the added users

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
    // Prevent adding a user that's already in the added users list
    if (!addedUsers.find((addedUser) => addedUser.id === user._id)) {
      setAddedUsers([...addedUsers, user]);
    }
  };

  // Remove user from the added users list
  const handleRemoveUser = (userId) => {
    setAddedUsers(prevAddedUsers => 
      prevAddedUsers.filter((user) => user._id !== userId)
    );
  };

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
              <input type="text" name="name" placeholder="Group Name" />
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
                    <button onClick={() => handleRemoveUser(user._id)} className="remove-user-btn">
                      X
                    </button>
                  </div>
                ))}
              </div>

              {/* Display filtered users */}
              <div className="user-list">
                {filteredUsers.length === 0 ? (
                  <p>No users found</p>
                ) : (
                  filteredUsers.map((user) => (
                    <div key={user._id} className="user">
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
                        <button onClick={() => handleAddUser(user)}>Add</button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="button">
                <p>Click</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateGroup;
