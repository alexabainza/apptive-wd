import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

const CommunityNote = ({ note }) => {
  const { person_id } = useParams();
  const navigate = useNavigate();
  const [documentCount, setDocumentCount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (person_id) {
      fetchDocumentCount(person_id)
        .then((data) => setDocumentCount(data.document_count))
        .catch((error) => console.error("Error fetching document count:", error));
    }
  }, [person_id]);

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  const handleNoteClick = async () => {
    try {
      // Check if the document has already been viewed
      const hasViewed = await checkIfDocumentViewed(person_id, note.notes_id);
  
      if (!hasViewed) {
        // Document has not been viewed, proceed to log it
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
  
          // Use a callback function to get the updated documentCount
          setDocumentCount((prevCount) => {
            const updatedCount = prevCount + 1;
  
            // Check if the limit has been reached
            if (updatedCount >= 3) {
              // Show the popup
              setShowPopup(true);
            }
  
            return updatedCount;
          });
        } else {
          console.error("Failed to log visited document");
          return;
        }
      }
  
      // Navigate to the note details page using the navigate function
      navigate(`/${person_id}/community-notes/${note.notes_id}`);
    } catch (error) {
      console.error("Error handling note click", error);
    }
  };
  

  // Function to check if the document has been viewed by the user
  const checkIfDocumentViewed = async (personId, noteId) => {
    try {
      const response = await fetch(`http://localhost:3000/checkIfDocumentViewed`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
        return false;
      }
    } catch (error) {
      console.error("Error checking if document has been viewed", error);
      return false;
    }
  };

  return (
    <div className="note-list-item d-flex align-items-center justify-content-between align-items-center text-white d-flex w-100 mb-0 p-2">
      {/* ... (existing code) */}
      <p className="w-25 text-center mb-0" style={{ fontSize: "15px" }} onClick={handleNoteClick}>
        {note.note_title}
      </p>
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
      <Modal show={showPopup} onHide={handleClosePopup}>
        <Modal.Header closeButton>
          <Modal.Title>Registration Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please register to view more documents.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClosePopup}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

// Function to fetch the document count for a user
const fetchDocumentCount = async (person_id) => {
  try {
    const response = await fetch(`http://localhost:3000/getDocumentCount/${person_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      return await response.json();
    } else {
      console.error("Failed to fetch document count");
      throw new Error("Failed to fetch document count");
    }
  } catch (error) {
    console.error("Error fetching document count", error);
    throw error;
  }
};

export default CommunityNote;
