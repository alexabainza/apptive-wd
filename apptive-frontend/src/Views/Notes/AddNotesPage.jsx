import React from "react";
import UserNavbar from "../Dashboard/UserNavbar";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AddNotesPage = ({ folder }) => {
  const [noteTitle, setNoteTitle] = useState("");
  const [contents, setContents] = useState("");
  const { user_id, folder_name } = useParams();
  const navigate = useNavigate();

  const handleAddNote = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(
        `http://localhost:3000/${user_id}/${folder_name}/addNote`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ noteTitle, contents }), // Corrected here
        }
      );
  
      // if (!response.ok) {
      //   throw new Error("Failed to save note");
      // }
  
      // Redirect to the NotesPage after successfully saving the note
      navigate(`/${user_id}/${folder_name}`);
    } catch (error) {
      console.error("Error saving note:", error.message);
    }
  };
  

  return (
    <div className="add-notes-page">
      <UserNavbar />
      <form onSubmit={handleAddNote}>
        <div className="form-group mx-5 my-5">
          <input
            className="form-control mb-3"
            type="text"
            placeholder="Untitled note"
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
          />
          <textarea
            style={{ resize: "none" }}
            className="form-control"
            value={contents}
            placeholder="Enter your notes here..."
            onChange={(e) => setContents(e.target.value)}
          />
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default AddNotesPage;
