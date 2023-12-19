// CreateModal.js
import React, { useState, useEffect} from "react";

const CreateModal = ({ isOpen, onClose, onAddFolder }) => {
  const [folderName, setFolderName] = useState("");

  useEffect(() => {
    if (isOpen) {
      setFolderName("");
    }
  }, [isOpen]);
  const handleAddFolder = () => {
    if (folderName.trim() !== "") {
      // Call the onAddFolder callback with the folder name
      onAddFolder(folderName);
    }
    onClose(); // Close the modal regardless of the result
  };

  return (
    <div
      className={`create-modal ${isOpen ? "open" : ""}`}
      style={{ backgroundColor: "#37425F", borderRadius: "10px", padding: "20px"}}

    >
      <div className="modal-content">
        <h3 className="text-white">Add Folder</h3>
        <label className="text-white">
          <small>Folder name</small>
        </label>
        <input
          type="text"
          value={folderName}
          className="form-control"
          onChange={(e) => setFolderName(e.target.value)}
        />
        <div className="modal-options d-flex justify-content-between mt-2 ">
          <button
            onClick={handleAddFolder}
            className="w-50 me-1"
            style={{ backgroundColor: "#D74242" }}
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="w-50 ms-1"
            style={{ backgroundColor: "#D74242" }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateModal;
