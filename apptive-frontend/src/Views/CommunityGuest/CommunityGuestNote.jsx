import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const CommunityGuestNote = ({ note }) => {
  const navigate = useNavigate();
  const guestId = localStorage.getItem("guestId");
  const [visitCount, setVisitCount] = useState(0);
  const [showAlert, setShowAlert] = useState(false);

  const handleNoteClick = async () => {
    await fetch("http://localhost:3000/logVisitedDocument", {
      method: "POST",
      headers: {
        'Guest-Id': guestId,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        person_id: guestId,
        note_id: note.notes_id,
      }),
    });

    // Navigate to the desired page
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
