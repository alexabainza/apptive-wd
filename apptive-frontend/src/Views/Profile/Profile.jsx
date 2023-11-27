import React, { useEffect, useState } from 'react';

const Profile = ({ user_id, username }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data from the backend based on user_id
    fetch(`/${user_id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setUserData(data.user);
        } else {
          console.error(data.message);
        }
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, [user_id]);

  return (
    <div>
      <h1 className='text-white'>Profile</h1>
      {userData && (
        <div>
          <p>User ID: {userData.user_id}</p>
          <p>Username: {userData.user_name}</p>
          <p>First Name: {userData.firstname}</p>
          <p>Last Name: {userData.lastname}</p>
          <p>Email: {userData.email}</p>
          {/* Display other user information as needed */}
        </div>
      )}
    </div>
  );
};

export default Profile;
