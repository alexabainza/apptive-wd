import React, { useEffect, useState, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import UserNavbar from "../Dashboard/UserNavbar";
import FlashcardPage from "./Flashcards";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

const IndivNote = () => {
  const navigate = useNavigate();
  const { folder_name, note_id } = useParams();
  const [note, setNote] = useState({});
  const [editedNote, setEditedNote] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [showFlashcardPage, setShowFlashcardPage] = useState(false); // State to control the visibility of FlashcardPage
  const [username, setUsername] = useState("");
  const [isPublic, setIsPublic] = useState(note.isPublic);
  const [key, setKey] = useState("notes");
  const [lastClickedButton, setLastClickedButton] = useState(null);
  const [highlightedTextQuestion, setHighlightedTextQuestion] = useState(""); // State for green highlight
  const [highlightedTextAnswer, setHighlightedTextAnswer] = useState(""); // State for yellow highlight

  const storedToken = localStorage.getItem("token");
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  const quillRef = useRef(null);
  const showSuccessNotificationForDuration = async (duration) => {
    setShowSuccessNotification(true);

    // Wait for the specified duration and then hide the notification
    await new Promise((resolve) => setTimeout(resolve, duration));

    setShowSuccessNotification(false);
  };
  useEffect(() => {
    fetch(`http://localhost:3000/${folder_name}/${note_id}`, {
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
          setUsername(data.user_name);
          setIsPublic(data.isPublic); // Set isPublic based on the initial note data
        } else {
          console.error("Error fetching note:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching note:", error);
      });
  }, [note_id]);

  const handleGoToFlashcards = () => {
    navigate(`/${folder_name}/${note_id}/flashcards`); // Navigate to "/flashcards" when the Flashcards tab is clicked
  }


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
      const highlightedText = quill.getText(range.index, range.length);
      if (lastClickedButton === "question") {
        setHighlightedTextQuestion(highlightedText);
      } else if (lastClickedButton === "answer") {
        setHighlightedTextAnswer(highlightedText);
      }
    }
  };

  const handleGenerateCard = async () => {
    // Pass highlighted texts to FlashcardPage when "Generate Card" is clicked
    setShowFlashcardPage(true);
    try {
      const response = await fetch(
        `http://localhost:3000/${folder_name}/${note_id}/makeFlashcards`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: storedToken,
          },
          body: JSON.stringify({
            folder_id: note.folder_id,
            flashcard_set_id: note_id, // Assuming note_id is the flashcard_set_id
            user_id: note.user_id, // Replace userId with the actual user ID
            question: highlightedTextQuestion,
            answer: highlightedTextAnswer,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to generate flashcard");
      }

      // Optionally, you can handle the response if needed
      const data = await response.json();
      // alert("card created successfully!")
      showSuccessNotificationForDuration(3000);
      // Reset highlighted texts after generating the flashcard
      setHighlightedTextQuestion("");
      setHighlightedTextAnswer("");
    } catch (error) {
      console.error("Error generating flashcard:", error.message);
    }
  };

  return (
    <div className="individual-note">
      <UserNavbar username={username} />

      <div className="individual-note-content mx-5 position-relative align-items-center">
        <div className="d-flex justify-content-between">
          <Link to={`../${folder_name}`} className="text-white back-btn mt-4">
            {"<"} Back
          </Link>
          <button onClick={handleGoToFlashcards}>Go to Flashcards</button>
        </div>
        {showSuccessNotification && (
          <div className="success-notification text-white px-3 py-1">
            Card created successfully!
          </div>
        )}
        
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
                    style={{
                      resize: "none",
                      height: "80vh",
                      overflowY: "scroll",
                    }}
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
                    <button
                      onClick={() => handleHighlight("green")}
                      onMouseDown={() => setLastClickedButton("question")}
                    >
                      Flashcard Question (Green)
                    </button>
                    <button
                      onClick={() => handleHighlight("yellow")}
                      onMouseDown={() => setLastClickedButton("answer")}
                    >
                      Flashcard Answer (Yellow)
                    </button>
                    <button onClick={handleSaveChanges}>Save Changes</button>
                    <button onClick={handleGenerateCard}>Generate Card</button>
                  </>
                )}
                {!isEditing && (
                  <button onClick={() => setIsEditing(true)}>Edit</button>
                )}
              </>
            )}
      </div>
    </div>
  );
};

export default IndivNote;
