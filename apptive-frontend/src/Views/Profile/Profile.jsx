import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserNavbar from "../Dashboard/UserNavbar";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import profile from "../../assets/profile-user.svg";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const { user_id } = useParams();
  const handleLogout = () => {
    navigate("/login");
  };

  useEffect(() => {
    fetch(`http://localhost:3000/${user_id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        if (data.success) {
          setUserData(data.user);
        } else {
          console.error(data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [user_id]);

  return (
    <div className="profile-page mt-0">
      {userData && (
        <UserNavbar username={userData.user_name} user_id={user_id} />
      )}
      <div className="tagBox">
        {/* <h1 className='text-white'>Hello</h1> */}
        {userData && (
          <div className="profileCont text-center text-#E3E3E3">
            <img className="profileIcon" src={profile}></img>
            <h3 className="profileFullname">
              <strong>
                {userData.firstname} {userData.lastname}
              </strong>
            </h3>
            <p className="profileUsername">
              <strong>@{userData.user_name}</strong>
            </p>
            <p> Email:</p>
            <p className="profileEmail">{userData.email}</p>
            <p className="profileUserID">
              <small>User ID: {userData.user_id}</small>
            </p>
          </div>
        )}
        <Button className="signoutProfile">
          <Link className="signoutLink" to="/login" onClick={handleLogout}>
            Sign out
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Profile;
