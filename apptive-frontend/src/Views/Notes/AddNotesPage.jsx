import React from "react";
import UserNavbar from "../Dashboard/UserNavbar";
import { useState } from "react";

import { useParams, useNavigate, Link } from "react-router-dom";

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
          body: JSON.stringify({ noteTitle, contents }),
        }
      );
      navigate(`/${user_id}/${folder_name}`);
    } catch (error) {
      console.error("Error saving note:", error.message);
    }
  };
  

  return (
    <div className="add-notes-page">
      <UserNavbar />
      <div className="form-group mx-5 mb-4">

      <Link to = {`../${user_id}/${folder_name}`} className="mb-5" >{"<"}   Back</Link>
</div>
      <form onSubmit={handleAddNote}>
        <div className="form-group mx-5 my-1">

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
