import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserNavbar from "../Dashboard/UserNavbar";
import Navbar from "../Navbar/Navbar";
import { Button } from "react-bootstrap";
import profile from "../../assets/profile-user.svg";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [userType, setUserType] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);

    const fetchUserType = async () => {
      try {
        const userTypeResponse = await fetch(`http://localhost:3000/check-user-type`, {
          headers: {
            Authorization: `${storedToken}`, // Include "Bearer" before the token
          },
        });

        if (userTypeResponse.ok) {
          const userTypeData = await userTypeResponse.json();
          if (userTypeData.success) {
            setUserType(userTypeData.userType);
          } else {
            console.error(userTypeData.message);
          }
        } else {
          console.error("Failed to fetch user type:", userTypeResponse.status);
          // Handle unauthorized or other errors here
        }
      } catch (error) {
        console.error("Error fetching user type:", error);
      }
    };

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

    fetchUserType(); // Fetch user type first
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
  return (
    <div className="profile-page mt-0">
      {userType === "registered" ? (
        <UserNavbar username={userData?.username} />
      ) : userType === "guest" ? (
        <Navbar />
      ) : null}
      <div className="tagBox">
        {userData && (
          <div className="profileCont text-center text-#E3E3E3">
            <img className="profileIcon" src={profile} alt="Profile Icon" />
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
          </div>
        )}
        <Button className="signoutProfile" onClick={handleLogout}>
          Sign out
        </Button>
      </div>
    </div>
  );
};

export default Profile;
