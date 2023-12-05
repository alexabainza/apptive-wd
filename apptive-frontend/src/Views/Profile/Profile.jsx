import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
import UserNavbar from '../Dashboard/UserNavbar';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const { user_id } = useParams();

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
        console.error('Error fetching user data:', error);
      });
  }, [user_id]);

  return (
    <div className='profile-page mt-0 border border-white'>
      {userData && <UserNavbar username={userData.user_name} user_id={user_id} />}
      <div className='mx-4'>
        <h1 className='text-white'>Profile</h1>
        {userData && (
          <div className='text-white'>
            <p>User ID: {userData.user_id}</p>
            <p>Username: {userData.user_name}</p>
            <p>First Name: {userData.firstname}</p>
            <p>Last Name: {userData.lastname}</p>
            <p>Email: {userData.email}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
