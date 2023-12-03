// AddButton.js
import React, { useState } from 'react';
import CreateModal from './CreateModal';

// AddButton.js
const AddButton = ({ user_id, onFolderAdded }) => {
    const [isModalOpen, setModalOpen] = useState(false);
  
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
  
    const handleAddFolder = async (folderName) => {
      try {
        if (!folderName || folderName.trim() === '') {
          console.error('Folder name is empty or whitespace.');
          return;
        }
  
        const response = await fetch(`http://localhost:3000/${user_id}/dashboard/addFolder`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ folderName }),
        });
  
        const data = await response.json();
  
        if (data.success) {
          // Call the onFolderAdded callback to update the state in the Dashboard component
          onFolderAdded(folderName);
        } else {
          console.error('Error adding folder:', data.message);
        }
      } catch (error) {
        console.error('Error adding folder:', error.message);
      }
      closeModal();
    };
  
    return (
      <div className="add-button-container">
        <button className="add-button rounded" onClick={openModal}>
          +
        </button>
        <CreateModal isOpen={isModalOpen} onClose={closeModal} onAddFolder={handleAddFolder} />
      </div>
    );
  };
  

export default AddButton;
