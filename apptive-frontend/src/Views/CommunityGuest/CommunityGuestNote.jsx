import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const CommunityGuestNote = ({ note }) => {
  const navigate = useNavigate();
  const guestId = localStorage.getItem("guestId");
  const [showAlert, setShowAlert] = useState(false);
  const handleNoteClick = async () => {
    try {
      const response = await fetch("http://localhost:3000/checkIfDocumentViewed", {
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
  
      if (!response.ok) {
        console.error("Failed to check if the document is viewed");
        return;
      }
  
      const data = await response.json();
  
      // Check if the user has viewed 3 different documents
      if (data.document_count >= 3) {
        console.log("User has viewed 3 different documents. Cannot open more.");
        // Show an alert or take appropriate action
        setShowAlert(true);
      } else if (data.viewed) {
        // Log the visited document
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
      } else {
        // User hasn't viewed this note, and document count hasn't reached 3
        console.log("User hasn't viewed this note. Cannot open.");
        // Show an alert or take appropriate action
        setShowAlert(true);
      }
    } catch (error) {
      console.error("Error checking if document viewed:", error);
    }
  };
  

  useEffect(() => {
    // Effect to reset showAlert state when component unmounts
    return () => setShowAlert(false);
  }, []);

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
      {showAlert && (
        <div className="alert alert-danger" role="alert">
          You have viewed 3 different documents. Cannot open more.
        </div>
      )}
    </tr>
  );
};

export default CommunityGuestNote;
