import React, { useState, useEffect } from "react";
import UserNavbar from "../Dashboard/UserNavbar";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { jwtDecode } from "jwt-decode";

const AddNotesPage = ({ folder }) => {
  const [noteTitle, setNoteTitle] = useState("");
  const [contents, setContents] = useState("");
  const [username, setUsername] = useState("");

  const { folder_name } = useParams();
  const storedToken = localStorage.getItem("token");
  const navigate = useNavigate();

  const quillRef = useRef(null);

  useEffect(() => {
    if (storedToken) {
      try {
        const decodedToken = jwtDecode(storedToken);
        setUsername(decodedToken.username);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [storedToken]);

  const handleAddNote = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/${folder_name}/addNote`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: storedToken,
          },
          body: JSON.stringify({ noteTitle, contents }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUsername(data.username);
      } else {
        console.error("Error saving note:", response.statusText);
      }

      navigate(`/${folder_name}`);
    } catch (error) {
      console.error("Error saving note:", error.message);
    }
  };

  return (
    <div className="add-notes-page">
      <UserNavbar username={username} />
      <div className="form-group mx-5 mb-4">
        <Link to={`../${folder_name}`} className="mb-5">
          {"<"} Back
        </Link>
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
          <ReactQuill
            theme="snow"
            style={{ resize: "none", height: "65vh", overflowY: "scroll" }}
            className="form-control"
            ref={quillRef}
            value={contents}
            onChange={(value) => setContents(value)}
            placeholder="Enter your notes here..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
          />
          <input type="submit" value="Submit" className="button-style" />
        </div>
      </form>
    </div>
  );
};

export default AddNotesPage;
