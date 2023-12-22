import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";

const CommunityGuestNote = ({ note }) => {
  const navigate = useNavigate();
  const guestId = localStorage.getItem("guestId");
  const [showLoginModal, setShowLoginModal] = useState(false);

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

      if (data.document_count >= 3 && !data.viewed) {
        setShowLoginModal(true);
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
        navigate(`/guest/community-notes/${note.notes_id}`);
      }
    } catch (error) {
      console.error("Error checking if document viewed:", error);
    }
  };
  useEffect(() => {
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
