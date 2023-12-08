import React from "react";
import { Link, useParams } from "react-router-dom";

const CommunityNote = ({ note }) => {
  const { person_id } = useParams();
  const handleNoteClick = async () => {
    try {
      // Send a POST request to log the visited document
      const response = await fetch("http://localhost:3000/logVisitedDocument", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          person_id: person_id,
          note_id: note.notes_id,
        }),
      });

      if (response.ok) {
        console.log("Visited document logged successfully");
      } else {
        console.error("Failed to log visited document");
      }
    } catch (error) {
      console.error("Error logging visited document", error);
    }
  };

  return (
    <div className="note-list-item d-flex align-items-center justify-content-between align-items-center text-white d-flex w-100 mb-0 p-2">
      {person_id ? (
        <Link to={`/${person_id}/community-notes/${note.notes_id}`}>
          <p
            className="w-25 text-center mb-0"
            style={{ fontSize: "15px" }}
            onClick={handleNoteClick} // Add the click handler to the note title
          >
            {note.note_title}
          </p>
        </Link>
      ) : (
        <Link to={`/${person_id}/community-notes/${note.notes_id}`}>
          <p
            className="w-25 text-center mb-0"
            style={{ fontSize: "15px" }}
            // onClick={handleNoteClick} // Add the click handler to the note title
          >
            {note.note_title}
          </p>
        </Link>
      )}
      <p className="w-25 text-center mb-0" style={{ fontSize: "15px" }}>
        {note.folder_name}
      </p>
      <Link to={`../viewProfile/${note.user_name}`}>
        <p className="w-25 text-center mb-0" style={{ fontSize: "15px" }}>
          {note.user_name}
        </p>
      </Link>

      <p className="w-25 text-center mb-0" style={{ fontSize: "15px" }}>
        {new Date(note.modified_at).toLocaleString()}
      </p>
    </div>
  );
};

export default CommunityNote;
