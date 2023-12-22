import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserNavbar from "../Dashboard/UserNavbar";
import Navbar from "../Navbar/Navbar";
import { Button, Form } from "react-bootstrap";
import profile from "../../assets/profile-user.svg";
import { jwtDecode } from "jwt-decode";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [storedToken] = useState(localStorage.getItem("token"));
  const [username, setUsername] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [token, setToken] = useState();
  const [editedUserData, setEditedUserData] = useState({
    firstname: "",
    lastname: "",
  });

  const navigate = useNavigate();
  useEffect(() => {
    if (!storedToken) {
      navigate("/login");
    } else {
      try {
        const decodedToken = jwtDecode(storedToken);
        // Store decoded user data in state
        setUsername(decodedToken.username);
      } catch (error) {
        console.error("Error decoding token:", error);
        // Handle error decoding token
      }
    }
  }, [storedToken]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/profile`, {
          headers: {
            Authorization: `${storedToken}`, // Include "Bearer" before the token
          },
        });

        if (response.ok) {
          const userData = await response.json();
          if (userData.success) {
            setUserData(userData.user);
          } else {
            console.error(userData.message);
          }
        } else {
          console.error("Failed to fetch user data:", response.status);
          // Handle unauthorized or other errors here
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData(); // Fetch user data
  }, [token]); // Add token as a dependency

  const handleLogout = async () => {
    try {
      // Call the logout endpoint on the server
      const logoutResponse = await fetch("http://localhost:3000/logout", {
        method: "POST",
        headers: {
          Authorization: `${token}`, // Include "Bearer" before the token
        },
      });

      if (logoutResponse.ok) {
        // Remove the token from local storage
        localStorage.removeItem("token");
        // Navigate to the login page or perform other logout actions
        navigate("/login");
      } else {
        console.error("Failed to logout:", logoutResponse.status);
        // Handle logout failure here
      }
    } catch (error) {
      console.error("Error during logout:", error);
      // Handle logout error here
    }
  };

  const handleEditToggle = () => {
    setIsEditing((prevIsEditing) => !prevIsEditing);
    setEditedUserData({
      firstname: userData?.firstname || "",
      lastname: userData?.lastname || "",
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
          Authorization: `${token}`,
        },
        body: JSON.stringify(editedUserData),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setUserData((prevUserData) => ({
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
    <div className="profile-page mt-0">
      <UserNavbar username={username} />
      {userData && (
        <div className="tagBox">
          <div className="profileCont text-center text-#E3E3E3">
            <img className="profileIcon" src={profile} alt="Profile Icon" />
            {isEditing ? (
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
            ) : (
              <>
                <h3 className="profileFullname">
                  <strong>{`${userData.firstname} ${userData.lastname}`}</strong>
                </h3>
                <p className="profileUsername">
                  <strong>@{userData.username}</strong>
                </p>
                <p>Email:</p>
                <p className="profileEmail">{userData.email}</p>
                <p className="profileUserID">
                  <small>User ID: {userData.user_id}</small>
                </p>
              </>
            )}
          </div>
          {/* <div className="d-flex"> */}
            {!isEditing && (
            <Button
              className="editProfile button-style"
              onClick={handleEditToggle}
            >
              Edit Profile
            </Button>
          )}
          {/* <Button
            className="signoutProfile button-style"
            onClick={handleLogout}
          >
            Sign out
          </Button> */}
          </div>
          
        // </div>
      )}
    </div>
  );
};

export default Profile;
