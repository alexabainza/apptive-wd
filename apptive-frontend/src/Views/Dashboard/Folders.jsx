import React from "react";
import Folder from "./Folder";

const Folders = ({ folders, onDeleteFolder, onEditFolder }) => {
  if (folders.length === 0) {
    return <p className="text-white">You have no folders.</p>;
  }
  
  return (
    <div className="row">
      {folders.map((folder) => (
        <div key={folder.folder_id} className="col-md-6 col-lg-4 col-xl-3 mb-3">
          <Folder
            key={folder.folder_id}
            folderId={folder.folder_id}
            folderName={folder.folder_name}
            noOfNotes={folder.notesCount}
            onDeleteFolder={onDeleteFolder}
            onEditFolder={onEditFolder}
          />
        </div>
      ))}
    </div>
  );
};

export default Folders;
