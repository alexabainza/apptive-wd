// AddButton.js
import React, { useState } from 'react';
import CreateModal from './CreateModal';
import { PlusCircleFill } from 'react-bootstrap-icons';

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
        <PlusCircleFill onClick={openModal} size={50} className='text-white' style={{cursor: 'pointer', color: "#D74242!important"}}></PlusCircleFill>
        <CreateModal isOpen={isModalOpen} onClose={closeModal} onAddFolder={handleAddFolder} />
      </div>
    );
  };
  

export default AddButton;
