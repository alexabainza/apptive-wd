import React from "react";
import { Link } from "react-router-dom";

const CommunityNote = ({ note }) => {
  return (
    <div className="note-list-item d-flex align-items-center justify-content-between align-items-center text-white d-flex w-100 mb-0 p-2">
      <Link to={`/guestDashboard/${note.notes_id}`}>
        <p className="w-25 text-center mb-0" style={{fontSize: "15px"}}>{note.note_title}</p>
      </Link>
      <p className="w-25 text-center mb-0" style={{fontSize: "15px"}}>{note.folder_name}</p>

      <p className="w-25 text-center mb-0" style={{fontSize: "15px"}}>{note.user_name}</p>

      <p className="w-25 text-center mb-0" style={{fontSize: "15px"}}>
        {new Date(note.modified_at).toLocaleString()}
      </p>
    </div>
  );
};

export default CommunityNote;
