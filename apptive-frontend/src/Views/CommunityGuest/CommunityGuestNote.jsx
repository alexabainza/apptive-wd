import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal"; // Import the LoginModal component

const CommunityGuestNote = ({ note }) => {
  const navigate = useNavigate();
  const guestId = localStorage.getItem("guestId");
  const [showAlert, setShowAlert] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false); // State for login modal

  const handleNoteClick = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/checkIfDocumentViewed",
        {
          method: "POST",
          headers: {
            "Guest-Id": guestId,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            person_id: guestId,
            note_id: note.notes_id,
          }),
        }
      );

      if (!response.ok) {
        console.error("Failed to check if the document is viewed");
        return;
      }

      const data = await response.json();
      console.log("Data from server:", data);
      console.log("Document count: ", data.document_count);

      if (data.document_count >= 3 && !data.viewed) {
        console.log("User has viewed 3 different documents. Cannot open more.");
        // Show an alert or take appropriate action
        setShowLoginModal(true);
        // alert("dfds");
      } else if (data.document_count < 3 && !data.viewed) {
        await fetch("http://localhost:3000/logVisitedDocument", {
          method: "POST",
          headers: {
            "Guest-Id": guestId,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            person_id: guestId,
            note_id: note.notes_id,
          }),
        });
        navigate(`/guest/community-notes/${note.notes_id}`);
      } else if (data.viewed) {
        console.log("Document has already been viewed.");
        navigate(`/guest/community-notes/${note.notes_id}`);

        // Log the visited document

        // Navigate to the desired page
        navigate(`/guest/community-notes/${note.notes_id}`);
      }
    } catch (error) {
      console.error("Error checking if document viewed:", error);
    }
  };
  useEffect(() => {
    // Effect to reset state when the component unmounts
    return () => setShowLoginModal(false);
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
      <LoginModal
        showModal={showLoginModal}
        handleClose={() => setShowLoginModal(false)}
        handleLogin={() => navigate("/register")}
      />
    </tr>
  );
};

export default CommunityGuestNote;
