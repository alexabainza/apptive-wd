import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const CommunityGuestNote = ({ note }) => {
  const navigate = useNavigate();
  const guestId = localStorage.getItem("guestId");
  const [visitCount, setVisitCount] = useState(0);
  const [showAlert, setShowAlert] = useState(false);

  const handleNoteClick = async () => {
    try {
      // Check if the document has been viewed
      const hasBeenViewed = await checkIfDocumentViewed(guestId, note.notes_id);

      if (hasBeenViewed) {
        // Document has been viewed, no need to log it
        navigate(`/guest/community-notes/${note.notes_id}`);
      } else {
        // Document has not been viewed, check visit count
        const documentCount = await fetchDocumentCount(guestId);

        if (documentCount >= 3) {
          // Guest has reached the limit of 3 document views, show alert to log in
          alert("Guests are limited to viewing 3 documents. Please log in to view more.");
          setShowAlert(true);
        } else {
          // Log the document view
          const response = await logDocumentView();

          if (response.ok) {
            console.log("Visited document logged successfully");
            setVisitCount(documentCount + 1); // Increment the visit count
            navigate(`/guest/community-notes/${note.notes_id}`);
          } else {
            alert("Error logging document view. Please try again.");
          }
        }
      }
    } catch (error) {
      console.error("Error handling note click", error);
    }
  };

  const logDocumentView = async () => {
    try {
      // Send a POST request to log the document view
      return await fetch("http://localhost:3000/logVisitedDocument", {
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
    } catch (error) {
      console.error("Error logging document view", error);
      throw error;
    }
  };

  const fetchDocumentCount = async (person_id) => {
    
    try {
      console.log("person id is " + person_id)
      // Fetch the document count from the server
      const response = await fetch(`http://localhost:3000/getDocumentCount/${person_id}`, {
        method: "GET",
        headers: {
          'Guest-Id': guestId,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data.document_count;
      } else {
        console.error("Failed to fetch document count");
        throw new Error("Failed to fetch document count");
      }
    } catch (error) {
      console.error("Error fetching document count", error);
      throw error;
    }
  };

  const checkIfDocumentViewed = async (personId, noteId) => {
    try {
      // Check if the document has been viewed by sending a POST request
      const response = await fetch("http://localhost:3000/checkIfDocumentViewed", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Guest-Id': guestId,
        },
        body: JSON.stringify({
          person_id: personId,
          note_id: noteId,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        return result.viewed;
      } else {
        console.error("Failed to check if document has been viewed");
        throw new Error("Failed to check if document has been viewed");
      }
    } catch (error) {
      console.error("Error checking if document has been viewed", error);
      throw error;
    }
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
