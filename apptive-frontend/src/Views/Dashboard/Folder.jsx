// Inside Folder.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
const Folder = ({
  user_id,
  folderId,
  folderName,
  username,
  description,
  favorited,
  noOfNotes,
  createdAt,
  modifiedAt,
  onDeleteFolder,
  onEditFolder,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newFolderName, setNewFolderName] = useState(folderName);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleDeleteClick = () => {
    onDeleteFolder(folderId);
    setIsMenuOpen(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setIsMenuOpen(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSaveChanges = () => {
    onEditFolder(folderId, newFolderName);
    setIsEditing(false);
    setIsMenuOpen(false);
  };
  return (
    <div className="dashboard-body-folders px-4 py-2 mb-2 d-flex flex-column justify-content-between align-items-start text-left">
      {isEditing ? (
        <div className="dashboard-body-left d-flex flex-column">
          <input
            className="form-control"
            type="text"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
          />
          <div className="d-flex ">
            <button
              className="folder-options btn btn-primary"
              onClick={handleSaveChanges}
              style={{ fontSize: "15px" }}
            >
              Save
            </button>
            <button
              className="folder-options btn btn-primary"
              onClick={handleCancelEdit}
              style={{ fontSize: "15px" }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="dashboard-body-left d-flex flex-column">
          <Link to={`/${folderName}`} className="text-white">
            <h4 className="folder-name mt-3 mb-0">
              <strong>{folderName}</strong>
            </h4>
            <p className="text-white">{`${noOfNotes} notes`}</p>
          </Link>
        </div>
      )}
      <div
        className="three-dot-menu text-white"
        style={{ cursor: "pointer" }}
        onClick={handleMenuClick}
      >
        &#8226;&#8226;&#8226;
      </div>

      {isMenuOpen && !isEditing && (
        <div>
          <button
            onClick={handleDeleteClick}
            className="folder-options btn btn-primary"
          >
            <h4 style={{ fontSize: "15px" }}>Delete</h4>
          </button>
          <button
            onClick={handleEditClick}
            className="folder-options btn btn-primary"
          >
            <h4 style={{ fontSize: "15px" }}>Edit</h4>
          </button>
        </div>
      )}
    </div>
  );
};

export default Folder;
