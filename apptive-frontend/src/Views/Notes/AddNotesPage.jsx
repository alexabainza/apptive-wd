import React from "react";
import UserNavbar from "../Dashboard/UserNavbar";
import { useState } from "react";

import { useParams, useNavigate, Link } from "react-router-dom";

import { useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddNotesPage = ({ folder }) => {
  const [noteTitle, setNoteTitle] = useState("");
  const [contents, setContents] = useState("");
  const [username, setUsername] = useState("");

  const { folder_name } = useParams();
  const storedToken = localStorage.getItem("token");
  const navigate = useNavigate();

  const quillRef = useRef(null);

  
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
      navigate(`/${folder_name}`);
    } catch (error) {
      console.error("Error saving note:", error.message);
    }
  };

  const handleHighlight = (color) => {
    const quill = quillRef.current.getEditor();
    const range = quill.getSelection();

    if (range) {
      const isHighlighted =
        quill.getFormat(range.index, range.length).background === color;
      quill.formatText(range.index, range.length, {
        background: isHighlighted ? null : color,
      });
    }
  };

  return (
    <div className="add-notes-page">
      <UserNavbar />
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
            style={{ resize: "none", height: "80vh", overflowY: "scroll" }}
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
          <div className="my-2">
            <button type="button" onClick={() => handleHighlight("green")}>
              Flashcard Question (Green)
            </button>
            <button type="button" onClick={() => handleHighlight("yellow")}>
              Flashcard Answer (yellow)
            </button>
          </div>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default AddNotesPage;
