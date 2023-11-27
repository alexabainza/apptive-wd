import React from 'react';

const Folders = ({ id, title, notesCount, onDelete, onEdit, onClick }) => {
  const handleEdit = () => {
    const newTitle = prompt('Enter new folder name:', title);
    if (newTitle && newTitle !== title) {
      onEdit(id, newTitle);
    }
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${title}" folder?`);
    if (confirmDelete) {
      onDelete(id);
    }
  };

  const handleFolderClick = () => {
    onClick(title);
  };

  return (
    <div
      className="dashboard-body-folders px-4 py-2 mb-3 d-flex flex-column justify-content-between align-items-start text-left"
      onClick={handleFolderClick}
    >
      <div className="dashboard-body-left d-flex flex-column">
        <h3 className="text-white mb-0">{title}</h3>
        <p>{`${notesCount} notes`}</p>
      </div>
      <div className="three-dot-menu" onClick={handleFolderClick}>
        &#8226;&#8226;&#8226;
      </div>
    </div>
  );
};

export default Folders;
