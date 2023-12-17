import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button, Alert } from "react-bootstrap";

const CommunityNote = ({ note }) => {
  const { person_id } = useParams();
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
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

  const handleNoteClick = async () => {
    try {
      const hasViewed = await checkIfDocumentViewed(person_id, note.notes_id);

      const logDocumentView = async () => {
        try {
          const response = await fetch(
            "http://localhost:3000/logVisitedDocument",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                person_id: person_id,
                note_id: note.notes_id,
              }),
            }
          );

          if (response.ok) {
            console.log("Visited document logged successfully");

            const documentCount = await fetchDocumentCount(person_id);
            setVisitCount(documentCount);

            if (userType === "guest" && documentCount >= 3) {
              setShowAlert(true);
              return;
            }

            // Continue with navigation
            navigate(`/${person_id}/community-notes/${note.notes_id}`);
          } else {
            alert(
              "You have used up your free document visits. Please register to continue"
            );
          }
        } catch (error) {
          console.error("Error logging document view", error);
        }
      };

      if (!hasViewed || userType === "registered") {
        await logDocumentView();
      } else if (userType === "guest" && visitCount >= 3) {
        // Handle the case when a guest attempts to open more than the allowed number of documents
        alert("Guests are limited to viewing 3 documents. Please register to view more.");
      }
    } catch (error) {
      console.error("Error handling note click", error);
    }
  };

  return (
    <div className="note-list-item d-flex text-white w-100 py-1">
      <p
        className="note-list-title-entry w-25 text-center mb-0"
        style={{ fontSize: "16px" }}
        onClick={handleNoteClick}
      >
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
      <p className="w-25 text-center mb-0" style={{ fontSize: "16px" }}>
        {new Date(note.modified_at).toLocaleString()}
      </p>

      <Alert show={showAlert} variant="danger">
        <Alert.Heading>Registration Required</Alert.Heading>
        <p>Please register to view more documents.</p>
        <hr />
        <div className="d-flex justify-content-end">
          <Link to="/register">
            <Button variant="outline-danger" onClick={() => setShowAlert(false)}>
              Register
            </Button>
          </Link>
        </div>
      </Alert>
    </div>
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

export default CommunityNote;
