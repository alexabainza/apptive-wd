// Dashboard.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Folders from './Folders';
import UserNavbar from './UserNavbar';
import AddButton from './AddButton';

function Dashboard() {
  const [folders, setFolders] = useState([]);
  const [noFoldersMessage, setNoFoldersMessage] = useState(null);
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const storedToken = localStorage.getItem('token');

  useEffect(() => {
    if (!storedToken) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/dashboard`, {
          headers: {
            Authorization: `${storedToken}`,
          },
        });

        if (!response.ok) {
          console.error('Authentication failed: Invalid token');
          navigate('/login');
          return;
        }

        const data = await response.json();

        if (data.success) {
          const user = data.user[0];

          if (user) {
            setUsername(user.user_name);
            setUserId(user.user_id);

            if (user.folders.length === 0) {
              setNoFoldersMessage('You have no folders.');
            } else {
              setFolders(user.folders);
            }
          } else {
            setUsername(user.user_name);

            setNoFoldersMessage('User not found or has no folders.');
          }
        } else {
          console.error('Error fetching folders:', data.message);
        }
      } catch (error) {
        console.error('Error fetching folders:', error);
      }
    };

    fetchData();
  }, [navigate, storedToken]);

  const handleEditFolder = (folderId, newFolderName) => {
    fetch(`http://localhost:3000/dashboard/updateFolder/${folderId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${storedToken}`,
      },
      body: JSON.stringify({ newFolderName }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setFolders((prevFolders) =>
            prevFolders.map((folder) =>
              folder.folder_id === folderId ? { ...folder, folder_name: newFolderName } : folder
            )
          );
        } else {
          console.error('Error updating folder', data.message);
        }
      })
      .catch((error) => {
        console.error('Error updating folder: ', error);
      });
  };

  const handleFolderAdded = async (newFolderName) => {
    if (!newFolderName) {
      console.error('Folder name is empty or undefined.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/dashboard/addFolder`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${storedToken}`,
        },
        body: JSON.stringify({ folderName: newFolderName }),
      });

      const data = await response.json();

      if (data.success) {
        setFolders((prevFolders) => [...prevFolders, { folder_name: newFolderName, notesCount: 0 }]);
        setNoFoldersMessage(null);
      } else {
        console.error('Error adding folder:', data.message);
      }
    } catch (error) {
      console.error('Error adding folder:', error.message);
    }
  };

  const handleFolderDeleted = (folderId) => {
    fetch(`http://localhost:3000/dashboard/deleteFolder/${folderId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `${storedToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setFolders((prevFolders) => prevFolders.filter((folder) => folder.folder_id !== folderId));
        } else {
          console.error('Error deleting folder:', data.message);
        }
      })
      .catch((error) => {
        console.error('Error deleting folder:', error);
      });
  };
  
  useEffect(() => {
    // Check if folders.length is 0 after the state has been updated
    if (folders.length === 0) {
      setNoFoldersMessage('You have no folders.');
    } else {
      setNoFoldersMessage(null);
    }
  }, [folders]); // Run this effect whenever folders state changes
  

  return (
    <div className="user-dashboard mt-0">
      <UserNavbar username={username} token={storedToken} />
      <div className="user-dashboard-bottom ">
        <h2 className="folderDirect text-white">
          <strong>Folders</strong>
        </h2>
        {noFoldersMessage ? (
          <p className="text-white">{noFoldersMessage}</p>
        ) : (
          folders ? (
            <Folders
              user_id={userId}
              username={username}
              folders={folders}
              onDeleteFolder={handleFolderDeleted}
              onEditFolder={handleEditFolder}
            />
          ) : (
            <p>Loading folders...</p>
          )
        )}
      </div>
      <AddButton user_id={userId} onFolderAdded={handleFolderAdded} />
    </div>
  );
}

export default Dashboard;
