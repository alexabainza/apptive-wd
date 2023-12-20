// CommunityNote.js
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button, Alert } from "react-bootstrap";
import {jwtDecode}from 'jwt-decode';

const CommunityNote = ({ note }) => {
  const { person_id } = useParams();
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const storedToken = localStorage.getItem("token");
  const [username, setUsername] = useState("")

  useEffect(() => {
    if (storedToken) {
      try {
        const decodedToken = jwtDecode(storedToken);
        // Store decoded user data in state
        setUsername(decodedToken.username)
      } catch (error) {
        console.error("Error decoding token:", error);
        // Handle error decoding token
      }
    }})
  const handleNoteClick = async () => {
    navigate(`/community-notes/${note.notes_id}`);
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

export default CommunityNote;
