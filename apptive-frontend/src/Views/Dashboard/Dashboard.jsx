import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Folders from './Folders';
import UserNavbar from './UserNavbar';
import AddButton from './AddButton';

function Dashboard() {
  const location = useLocation();
  const [folders, setFolders] = useState([]);
  const [noFoldersMessage, setNoFoldersMessage] = useState(null);
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      console.error("Authentication failed: Token is missing");
      // Handle authentication failure, e.g., redirect to login page
      navigate("/login");
      return;
    }

    setToken(storedToken);

    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/dashboard`, {
          headers: {
            Authorization: `${storedToken}`,
          },
        });

        if (!response.ok) {
          console.error("Authentication failed: Invalid token");
          navigate("/login");
          return;
        }

        const data = await response.json();

        if (data.success) {
          setUsername(data.user[0].user_name);
          setUserId(data.user[0].user_id);
          if (data.user.length === 0) {
            setNoFoldersMessage('You have no folders.');
          } else {
            setFolders(data.user);
          }
        } else {
          console.error('Error fetching folders:', data.message);
        }
      } catch (error) {
        console.error('Error fetching folders:', error);
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div className="user-dashboard mt-0">
      <UserNavbar username={username} />
      <div className="user-dashboard-bottom ">
        <h2 className="folderDirect text-white">
          <strong>Folders</strong>
        </h2>
        {noFoldersMessage ? (
          <p className="text-white">{noFoldersMessage}</p>
        ) : (
          folders ? <Folders user_id={userId} username={username} folders={folders} /> : <p>Loading folders...</p>
        )}
      </div>
      <AddButton user_id={userId} />
    </div>
  );
}

export default Dashboard;
