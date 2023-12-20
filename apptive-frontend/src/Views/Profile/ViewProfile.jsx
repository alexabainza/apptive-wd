import React, { useState, useEffect } from "react";
import UserNavbar from "../Dashboard/UserNavbar";
import Navbar from "../Navbar/Navbar";
import { useParams } from "react-router-dom";
import profile from "../../assets/profile-user.svg";
import {jwtDecode}from 'jwt-decode';

const ViewProfile = () => {
  const { username } = useParams();
  const [user, setUser] = useState({});
  const [user_username, setUser_Username] = useState("");
  const storedToken = localStorage.getItem("token");

  useEffect(() => {
    if (storedToken) {
      try {
        const decodedToken = jwtDecode(storedToken);
        // Store decoded user data in state
        setUser_Username(decodedToken.username)
      } catch (error) {
        console.error("Error decoding token:", error);
        // Handle error decoding token
      }
    }})
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

  return (
    <div className="view-profile-main">
      <div className="text-white">
        {storedToken ? (
          <UserNavbar username={user_username}/> // Render user Navbar if token exists
        ) : (
          <Navbar /> // Render nothing if no token exists
        )}
        <div className="tagBox">
          {user && (
            <div className="profileCont text-center text-#E3E3E3">
              <img className="profileIcon" src={profile} alt="Profile Icon" />
              <h3 className="profileFullname">
                <strong>
                  {user.firstname} {user.lastname}
                </strong>
              </h3>
              <p className="profileUsername">
                <strong>@{user.user_name}</strong>
              </p>
              <p>Email:</p>
              <p className="profileEmail">{user.email}</p>
              <p className="profileUserID">
                <small>User ID: {user.user_id}</small>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
