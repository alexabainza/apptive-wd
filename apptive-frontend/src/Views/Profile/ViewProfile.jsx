import React, { useState, useEffect } from "react";
import UserNavbar from "../Dashboard/UserNavbar";
import Navbar from "../Navbar/Navbar";
import { useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import profile from "../../assets/profile-user.svg";
import { jwtDecode } from "jwt-decode";

const ViewProfile = () => {
  const { username } = useParams();
  const [user, setUser] = useState({});
  const [user_username, setUser_Username] = useState("");
  const storedToken = localStorage.getItem("token");
  const [isEditing, setIsEditing] = useState(false);
  const [editedUserData, setEditedUserData] = useState({
    firstname: "",
    lastname: "",
  });

  useEffect(() => {
    if (storedToken) {
      try {
        const decodedToken = jwtDecode(storedToken);
        // Store decoded user data in state
        setUser_Username(decodedToken.username);
      } catch (error) {
        console.error("Error decoding token:", error);
        // Handle error decoding token
      }
    }
  }, [storedToken]);

  useEffect(() => {
    fetch(`http://localhost:3000/viewProfile/${username}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error("Error fetching user", data.error);
        } else {
          setUser(data.user);
        }
      })
      .catch((error) => {
        console.error("Error fetching user", error);
      });
  }, [username]);

  const handleEditToggle = () => {
    setIsEditing((prevIsEditing) => !prevIsEditing);
    setEditedUserData({
      firstname: user?.firstname || "",
      lastname: user?.lastname || "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch("http://localhost:3000/edit-profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${storedToken}`,
        },
        body: JSON.stringify(editedUserData),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setUser((prevUserData) => ({
            ...prevUserData,
            ...editedUserData,
          }));
          setIsEditing(false);
        } else {
          console.error(result.message);
        }
      } else {
        console.error("Failed to edit profile:", response.status);
      }
    } catch (error) {
      console.error("Error editing profile:", error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <div className="view-profile-main">
      <div className="text-white">
        {storedToken ? (
          <UserNavbar username={user_username} />
        ) : (
          <Navbar />
        )}
        <div className="tagBox">
          {user && (
            <div className="profileCont text-center text-#E3E3E3">
              <img className="profileIcon" src={profile} alt="Profile Icon" />
              {!isEditing && (
                <>
                  <h3 className="profileFullname">
                    <strong>
                      {user.firstname} {user.lastname}
                    </strong>
                  </h3>
                  <p className="profileUsername">
                    <strong>@{user.user_name}</strong>
                  </p>
                  <p>Email:<br/>{user.email}</p>
                  <p className="profileUserID">
                    <small>User ID: {user.user_id}</small>
                  </p>
                </>
              )}
              {storedToken && user_username === username && !isEditing && (
                // Render edit button if the viewed profile is the same as the logged-in user and not in editing mode
                <Button
                  className="editProfile button-style"
                  onClick={handleEditToggle}
                >
                  Edit Profile
                </Button>
              )}
              {isEditing && (
                // Render edit form if in editing mode
                <Form className="mt-4 d-flex flex-column justify-content-center align-items-center">
                  <Form.Group controlId="editFirstName" className="w-50">
                    <Form.Label className="mb-0">
                      <small>First Name</small>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="firstname"
                      value={editedUserData.firstname}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="editLastName" className="w-50">
                    <Form.Label className="mb-0">
                      <small>Last Name</small>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="lastname"
                      value={editedUserData.lastname}
                      onChange={handleInputChange}
                      className="mb-3"
                    />
                  </Form.Group>
                  <div className="d-flex">
                    <Button
                      variant="primary"
                      className="button-style"
                      onClick={handleSaveChanges}
                    >
                      Save Changes
                    </Button>
                    <Button
                      variant="secondary"
                      className="cancel-button-style"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </Button>
                  </div>
                </Form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
