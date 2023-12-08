import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

const CommunityNote = ({ note }) => {
  const { person_id } = useParams();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [userType, setUserType] = useState("");
  const [visitCount, setVisitCount] = useState(0);


  useEffect(() => {
    const fetchUserType = async () => {
      try {
        const userTypeResponse = await fetch(
          `http://localhost:3000/${person_id}/check-user-type`
        );
        const userTypeData = await userTypeResponse.json();

        if (userTypeData.userType) {
          setUserType(userTypeData.userType);
        } else {
          console.error("Error fetching user type:", userTypeData.message);
        }
      } catch (error) {
        console.error("Error fetching user type:", error);
      }
    };

    fetchUserType();
  }, [person_id]);

  const handleClosePopup = () => setShowPopup(false);

  const handleNoteClick = async () => {
    try {
      const hasViewed = await checkIfDocumentViewed(person_id, note.notes_id);
  
      const logDocumentView = async () => {
        try {
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
  
            // Fetch the document count directly here
            const documentCount = await fetchDocumentCount(person_id);
            setVisitCount(documentCount);
  
            if (userType === "guest" && documentCount >= 3) {
              setShowPopup(true);
              return;
            }
  
            if (userType === "registered") {
              setShowPopup(false);
            }
  
            // Continue with navigation
            navigate(`/${person_id}/community-notes/${note.notes_id}`);
          } else {
            console.error("Failed to log visited document");
          }
        } catch (error) {
          console.error("Error logging document view", error);
        }
      };
  
      if (!hasViewed || userType === "registered" || (userType === "guest" && visitCount < 3)) {
        await logDocumentView();
      }
    } catch (error) {
      console.error("Error handling note click", error);
    }
  };
  

  return (
    <div className="note-list-item d-flex text-white w-100 py-1">
      <p className="note-list-title-entry w-25 text-center mb-0" style={{ fontSize: "16px" }} onClick={handleNoteClick}>
        {note.note_title}
      </p>
      <p className="w-25 text-center mb-0" style={{ fontSize: "16px" }}>
        {note.folder_name}
      </p>
      <Link to={`../viewProfile/${note.user_name}`}>
        <p className="w-25 text-center mb-0" style={{ fontSize: "16px" }}>
          {note.user_name}
        </p>
      </Link>
      <p className="w-25 text-end mb-0" style={{ fontSize: "16px" }}>
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

const fetchDocumentCount = async (person_id) => {
  try {
    const response = await fetch(`http://localhost:3000/getDocumentCount/${person_id}`, {
      method: "GET",
      headers: {
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

export default CommunityNote;