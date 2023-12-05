// Inside Folders.jsx
import React from "react";
import Folder from "./Folder";

const Folders = ({ folders, onDeleteFolder, username, onEditFolder, user_id }) => {
  return (
    <div className="row">
      {folders.map((folder) => (
        <div key={folder.folder_id} className="col-md-6 col-lg-4 col-xl-3 mb-3">
          <Folder
            key={folder.folder_id}
            user_id={user_id}
            folderId={folder.folder_id}
            folderName={folder.folder_name}
            username={username}
            description={folder.description}
            favorited={folder.favorited}
            noOfNotes={folder.notesCount}
            createdAt={folder.created_at}
            modifiedAt={folder.modified_at}
            onDeleteFolder={onDeleteFolder}
            onEditFolder={onEditFolder}
          />
        </div>
      ))}
    </div>
  );
};

export default Folders;
