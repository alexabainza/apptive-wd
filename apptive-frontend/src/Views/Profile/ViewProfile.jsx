import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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
    <div className='text-white'>
      <p>Profile</p>
      {user && <p className='text-white'>{user.user_name}</p>}
    </div>
  );
};

export default ViewProfile;
