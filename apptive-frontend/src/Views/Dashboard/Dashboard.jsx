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

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/dashboard`, {
        headers: {
          Authorization: storedToken,
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
        setUsername(user.user_name);
        setUserId(user.user_id);
        setFolders(data.user);
        setNoFoldersMessage(data.user.length === 0 ? 'You have no folders.' : null);
      } else {
        console.error('Error fetching folders:', data.message);
      }
    } catch (error) {
      console.error('Error fetching folders:', error);
    }
  };

  const handleEditFolder = async (folderId, newFolderName) => {
    try {
      const response = await fetch(`http://localhost:3000/dashboard/updateFolder/${folderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: storedToken,
        },
        body: JSON.stringify({ newFolderName }),
      });

      const data = await response.json();

      if (data.success) {
        setFolders((prevFolders) =>
          prevFolders.map((folder) =>
            folder.folder_id === folderId ? { ...folder, folder_name: newFolderName } : folder
          )
        );
      } else {
        console.error('Error updating folder', data.message);
      }
    } catch (error) {
      console.error('Error updating folder:', error);
    }
  };

  const handleFolderAdded = async (newFolderName, e) => {
    e.preventDefault();
    if (!newFolderName.trim()) {
      console.error('Folder name is empty or whitespace.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/dashboard/addFolder`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: storedToken,
        },
        body: JSON.stringify({ folderName: newFolderName }),
      });

      const data = await response.json();

      if (data.success) {
        setFolders((prevFolders) => [
          ...prevFolders,
          { folder_id: data.folderId, folder_name: newFolderName, notesCount: 0 },
        ]);
      } else {
        console.error('Error adding folder:', data.message);
      }
    } catch (error) {
      console.error('Error adding folder:', error.message);
    }
  };

  const handleFolderDeleted = async (folderId) => {
    try {
      const response = await fetch(`http://localhost:3000/dashboard/deleteFolder/${folderId}`, {
        method: 'DELETE',
        headers: {
          Authorization: storedToken,
        },
      });

      const data = await response.json();

      if (data.success) {
        setFolders((prevFolders) => {
          const newFolders = prevFolders.filter((folder) => folder.folder_id !== folderId);
          if (newFolders.length === 0) {
            setNoFoldersMessage('You have no folders.');
          }
          return newFolders;
        });
      } else {
        console.error('Error deleting folder:', data.message);
      }
    } catch (error) {
      console.error('Error deleting folder:', error);
    }
  };

  useEffect(() => {
    if (!storedToken) {
      console.error('Authentication failed: Token is missing');
      navigate('/login');
    } else {
      fetchData();
    }
  }, [navigate, storedToken]);

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
