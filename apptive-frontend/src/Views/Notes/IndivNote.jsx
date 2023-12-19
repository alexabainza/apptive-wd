import React, { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import UserNavbar from "../Dashboard/UserNavbar";
import FlashcardPage from "./Flashcards";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const IndivNote = () => {
  const { user_id, folder_name, note_id } = useParams();
  const [note, setNote] = useState({});
  const [editedNote, setEditedNote] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [showFlashcardPage, setShowFlashcardPage] = useState(false); // State to control the visibility of FlashcardPage
  const [username, setUsername] = useState("");

  const storedToken = localStorage.getItem("token");

  const quillRef = useRef(null);

  useEffect(() => {
    fetch(`http://localhost:3000/${folder_name}/${note_id}`,{
      headers: {
        Authorization: storedToken,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data != null) {
          setNote(data);
          setEditedNote(data); // Initialize editedNote with the current note data
        } else {
          console.error("Error fetching note:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching note:", error);
      });
  }, [note_id]);

  useEffect(() => {
    setUsername(note.user_name);

  }, [note]);

  const handleToggleFlashcardPage = () => {
    setShowFlashcardPage((prevShowFlashcardPage) => !prevShowFlashcardPage);
  };

  const handleInputChange = (e) => {
    if (e.target) {
      const { name, value } = e.target;
      setEditedNote((prevNote) => ({
        ...prevNote,
        [name]: value,
      }));
    }
  };
  

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/${folder_name}/${note_id}/updateNote`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: storedToken,

          },
          body: JSON.stringify(editedNote),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save changes");
      }

      setNote(editedNote);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving changes:", error.message);
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
    <div className="individual-note">
      <UserNavbar username={username} />
      <div className="individual-note-content mx-5">
        <Link to={`../${folder_name}`} className="mb-5">
          {"<"} Back
        </Link>
        {note.notes_id && (
          <>
            <h1 className="text-white mt-2 mb-3">
              {isEditing ? (
                <input
                  type="text"
                  name="note_title"
                  className="form-control"
                  value={editedNote.note_title}
                  onChange={handleInputChange}
                />
              ) : (
                note.note_title
              )}
            </h1>
            {isEditing ? (
              <ReactQuill
                style={{ resize: "none", height: "80vh", overflowY: "scroll" }}
                className="form-control"
                ref={quillRef}
                theme="snow"
                value={editedNote.contents}
                onChange={(value) =>
                  handleInputChange({ target: { name: "contents", value } })
                }
                placeholder="Enter your notes here..."
              />
            ) : (
              <ReactQuill
                className="form-control"
                name="contents"
                value={editedNote.contents}
                onChange={handleInputChange}
                rows="10"
                cols="50"
                readOnly
              />
            )}
            {isEditing && (
              <>
                <button onClick={() => handleHighlight("green")}>
                  Flashcard Question (Green)
                </button>
                <button onClick={() => handleHighlight("yellow")}>
                  Flashcard Answer (Yellow)
                </button>
                <button onClick={handleSaveChanges}>Save Changes</button>
              </>
            )}
            {!isEditing && (
              <button onClick={() => setIsEditing(true)}>Edit</button>
            )}
            {!isEditing && (
              <>
                <button onClick={handleToggleFlashcardPage}>
                  {showFlashcardPage ? "Back to Note" : "Open Flashcard Page"}
                </button>
              </>
            )}
          </>
        )}
        {showFlashcardPage && <FlashcardPage />}
      </div>
    </div>
  );
};

export default IndivNote;
