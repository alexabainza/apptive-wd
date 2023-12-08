import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import profile from "../../assets/profile-user.svg";

const ViewProfile = () => {
  const { username } = useParams();
  const [user, setUser] = useState({});

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
    <div className='text-white'>
      {/* <p>Profile</p>
      {user && <p className='text-white'>{user.user_name}</p>} */}
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
        <Link to={`/${user.user_id}/community-notes`}>
          <button className="backback mt-4">Back</button>
        </Link>
      </div>

    </div>
  );
};

export default ViewProfile;
