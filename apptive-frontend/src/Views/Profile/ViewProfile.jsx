import React, { useState, useEffect } from "react";
import { Navbar } from "react-bootstrap";
import { useParams } from "react-router-dom";
import profile from "../../assets/profile-user.svg";

const ViewProfile = () => {
  const { username } = useParams();
  const [user, setUser] = useState({});
  // console.log("Username:", username);

  useEffect(() => {
    fetch(`http://localhost:3000/viewProfile/${username}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error("Error fetching user", data.error);
        } else {
          console.log(data.user);

          setUser(data.user);
        }
      })
      .catch((error) => {
        console.error("Error fetching user", error);
      });
  }, [username]);
  return (
    <div className="text-white">
      <Navbar/>
      <div className="tagBox">
        {/* <h1 className='text-white'>Hello</h1> */}
        {user && (
          <div className="profileCont text-center text-#E3E3E3">
            <img className="profileIcon" src={profile}></img>
            <h3 className="profileFullname">
              <strong>
                {user.firstname} {user.lastname}
              </strong>
            </h3>
            <p className="profileUsername">
              <strong>@{user.user_name}</strong>
            </p>
            <p> Email:</p>
            <p className="profileEmail">{user.email}</p>
            <p className="profileUserID">
              <small>User ID: {user.user_id}</small>
            </p>
          </div>
        )}

      </div>

    </div>
  );
};

export default ViewProfile;
