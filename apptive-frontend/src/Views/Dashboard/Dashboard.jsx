import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Folders from './Folders';
import UserNavbar from './UserNavbar';
import AddButton from './AddButton';

function Dashboard() {
  const location = useLocation();
  const { user_id } = useParams();
  const username = location.state && location.state.username;
  const [folders, setFolders] = useState([]); // Initialize with an empty array
  const [noFoldersMessage, setNoFoldersMessage] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/${user_id}/dashboard`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          if (data.user.length === 0) {
            setNoFoldersMessage('You have no folders.');
          } else {
            setFolders(data.user);
          }
        } else {
          console.error('Error fetching folders:', data.message);
        }
      })
      .catch((error) => {
        console.error('Error fetching folders:', error);
      });
  }, [user_id]);

  const handleEditFolder = (folderId, newFolderName) => {
    fetch(`http://localhost:3000/${user_id}/dashboard/updateFolder/${folderId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({newFolderName}),
      })
      .then((response)=>response.json())
      .then((data)=>{
        if(data.success){
          setFolders((prevFolders) =>
          prevFolders.map((folder) =>
            folder.folder_id === folderId
              ? { ...folder, folder_name: newFolderName }
              : folder
          )
        );
        }else{
          console.error("Error updating folder", data.message);
        }
      })
      .catch((error)=>{
        console.error("Error updating folder: ", error)
      })
  }
  const handleFolderAdded = (newFolderName) => {
    if (!newFolderName) {
      console.error('Folder name is empty or undefined.');
      return;
    }
  
    // Add the folder to the database
    fetch(`http://localhost:3000/${user_id}/dashboard/addFolder`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ folderName: newFolderName }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setFolders((prevFolders) => {
            return [...prevFolders, { folder_name: newFolderName }];
          });
          setNoFoldersMessage(null);
        } else {
          console.error('Error adding folder:', data.message);
        }
      })
      .catch((error) => {
        console.error('Error adding folder:', error);
      });
  };
  
  
  const handleFolderDeleted = (folderId) => {
    fetch(`http://localhost:3000/${user_id}/dashboard/deleteFolder/${folderId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setFolders((prevFolders) => prevFolders.filter((folder) => folder.folder_id !== folderId));
          if (folders.length === 1) {
            setNoFoldersMessage('You have no folders.');
          }
        } else {
          console.error('Error deleting folder:', data.message);
        }
      })
      .catch((error) => {
        console.error('Error deleting folder:', error);
      });
  };

  return (
    <div className="user-dashboard mt-0">
      <UserNavbar user_id={user_id} username={username} />
      <div className="user-dashboard-bottom mx-4">
        <h2 className="text-white">Your folders</h2>
        {noFoldersMessage ? (
          <p className="text-white">{noFoldersMessage}</p>
        ) : (
          folders ? <Folders user_id = {user_id} username={username} folders={folders} onDeleteFolder={handleFolderDeleted} onEditFolder={handleEditFolder}/> : <p>Loading folders...</p>
        )}
      </div>
      <AddButton user_id={user_id} onFolderAdded={handleFolderAdded} />
    </div>
  );
}

export default Dashboard;