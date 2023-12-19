// CommunityNote.js
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const CommunityGuestNote = ({ note }) => {
  const navigate = useNavigate();

  const handleNoteClick = async () => {
    navigate(`/guest/community-notes/${note.notes_id}`);
  };

  return (
    <tr className="note-list-item text-white">
      <td
        className="note-list-title-entry text-center"
        style={{ fontSize: "16px" }}
        onClick={handleNoteClick}
      >
        {note.note_title}
      </td>
      <td className="text-center" style={{ fontSize: "16px" }}>
        {note.folder_name}
      </td>
      <td className="text-center" style={{ fontSize: "16px" }}>
        <Link to={`../viewProfile/${note.user_name}`}>{note.user_name}</Link>
      </td>
      <td className="text-center" style={{ fontSize: "16px" }}>
        {new Date(note.modified_at).toLocaleString()}
      </td>
    </tr>
  );
};

export default CommunityGuestNote;
