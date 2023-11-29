// CreateModal.js
import React, { useState } from 'react';

const CreateModal = ({ isOpen, onClose, onAddFolder }) => {
  const [folderName, setFolderName] = useState('');

  const handleAddFolder = () => {
    if (folderName.trim() !== '') {
      // Call the onAddFolder callback with the folder name
      onAddFolder(folderName);
    }
    onClose(); // Close the modal regardless of the result
  };

  return (
    <div className={`create-modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <h2>Add Folder</h2>
        <label>Folder Name:</label>
        <input
          type="text"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
        />
        <button onClick={handleAddFolder}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default CreateModal;
