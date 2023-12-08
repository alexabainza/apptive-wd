import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserNavbar from "../Dashboard/UserNavbar";
import Navbar from "../Navbar/Navbar";
import { Button } from "react-bootstrap";
import profile from "../../assets/profile-user.svg";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [userType, setUserType] = useState(null);
  const { user_id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userTypeResponse = await fetch(`http://localhost:3000/${user_id}/check-user-type`);
        const userTypeData = await userTypeResponse.json();

        if (userTypeData.userType) {
          setUserType(userTypeData.userType);

          const userDataResponse = await fetch(`http://localhost:3000/${user_id}`);
          const userData = await userDataResponse.json();

          if (userData.success) {
            setUserData(userData.user);
          } else {
            console.error(userData.message);
          }
        } else {
          console.error("Error fetching user type:", userTypeData.message);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [user_id]);

  const handleLogout = () => {
    // Handle logout logic here
  };

  return (
    <div className="profile-page mt-0">
      {userType === "registered"
        ? <UserNavbar username={userData?.user_name} user_id={user_id} />
        : userType === "guest"
          ? <Navbar />
          : null
      }
      <div className="tagBox">
        {userData && (
          <div className="profileCont text-center text-#E3E3E3">
            <img className="profileIcon" src={profile} alt="Profile Icon" />
            <h3 className="profileFullname">
              <strong>{`${userData.firstname} ${userData.lastname}`}</strong>
            </h3>
            <p className="profileUsername">
              <strong>@{userData.user_name}</strong>
            </p>
            <p>Email:</p>
            <p className="profileEmail">{userData.email}</p>
            <p className="profileUserID">
              <small>User ID: {userData.user_id}</small>
            </p>
          </div>
        )}
        <Button className="signoutProfile">
          <button className="signoutLink" onClick={handleLogout}>
            Sign out
          </button>
        </Button>
      </div>
    </div>
  );
};

export default Profile;
