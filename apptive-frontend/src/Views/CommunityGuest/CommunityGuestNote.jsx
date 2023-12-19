import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const CommunityGuestNote = ({ note }) => {
  const navigate = useNavigate();
  const guestId = localStorage.getItem("guestId");
  const [visitCount, setVisitCount] = useState(0);
  const [showAlert, setShowAlert] = useState(false);

  const logDocumentView = async () => {
    try {
      const response = await fetch("http://localhost:3000/logVisitedDocument", {
        method: "POST",
        headers: {
          'Guest-Id': localStorage.getItem("guestId"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          person_id: guestId,
          note_id: note.notes_id,
        }),
      });

      if (response.ok) {
        console.log("Visited document logged successfully");

        const documentCount = await fetchDocumentCount(guestId);
        setVisitCount(documentCount);

        if (documentCount >= 3) {
          setShowAlert(true);
        } else {
          // Continue with navigation
          console.log("Before navigate");
          navigate(`/guest/community-notes/${note.notes_id}`);
          console.log("After navigate");

        }
      } else {
        alert(
          "You have used up your free document visits. Please register to continue"
        );
      }
    } catch (error) {
      console.error("Error logging document view", error);
    }
  };

  const handleNoteClick = async () => {
    try {
      const hasViewed = await checkIfDocumentViewed(guestId, note.notes_id);

      if (!hasViewed) {
        await logDocumentView();
      } else if (visitCount >= 3) {
        // Handle the case when a guest attempts to open more than the allowed number of documents
        alert("Guests are limited to viewing 3 documents. Please register to view more.");
      }
    } catch (error) {
      console.error("Error handling note click", error);
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

const fetchDocumentCount = async (person_id) => {
  try {
    const response = await fetch(
      `http://localhost:3000/getDocumentCount/${person_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

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
    const response = await fetch(
      `http://localhost:3000/checkIfDocumentViewed`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          person_id: personId,
          note_id: noteId,
        }),
      }
    );

    if (response.ok) {
      const result = await response.json();
      return result.viewed;
    } else {
      console.error("Failed to check if document has been viewed");
      return false;
    }
  } catch (error) {
    console.error("Error checking if document has been viewed", error);
    return false;
  }
};
export default CommunityGuestNote;
