import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import UserNavbar from "../Dashboard/UserNavbar";
import {jwtDecode}from 'jwt-decode';
// const { sign, decode, verify } = jsonwebtoken;


const FlashcardPage = () => {
  const { folder_name, note_id } = useParams();
  const [isFlipped, setFlipped] = useState(false);
  const [flashcards, setFlashcards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [storedToken] = useState(localStorage.getItem("token"));
  const [editMode, setEditMode] = useState(false);
  const [editedFlashcardId, setEditedFlashcardId] = useState(null);
  const [editedQuestion, setEditedQuestion] = useState("");
  const [editedAnswer, setEditedAnswer] = useState("");
  const [username, setUsername] = useState("")
  const navigate = useNavigate();
  useEffect(() => {
    if(!storedToken){
      navigate("/login");

    }
    else{
      try {
        const decodedToken = jwtDecode(storedToken);
        // Store decoded user data in state
        setUsername(decodedToken.username)
      } catch (error) {
        console.error("Error decoding token:", error);
        // Handle error decoding token
      }
    }
  }, [storedToken]);

  useEffect(() => {
    fetch(`http://localhost:3000/${folder_name}/${note_id}/flashcards`, {
      headers: {
        Authorization: storedToken,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data != null) {
          setFlashcards(data.data || []);
        } else {
          console.error("Error fetching flashcards:", data?.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching flashcards:", error);
      });
  }, [folder_name, note_id, storedToken]);

  const handleFlip = () => {
    setFlipped(!isFlipped);
  };

  const handleNextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    setFlipped(false); // Reset flip state when moving to the next card
  };

  const handlePrevCard = () => {
    setCurrentCardIndex(
      (prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length
    );
    setFlipped(false); // Reset flip state when moving to the previous card
  };

  const handleGoToNotes = () => {
    navigate(`../${folder_name}/${note_id}`);
  };

  const handleEditFlashcard = (flashcardId) => {
    const flashcardToEdit = flashcards.find(
      (flashcard) => flashcard.flashcard_id === flashcardId
    );
    setEditedFlashcardId(flashcardId);
    setEditedQuestion(flashcardToEdit.question);
    setEditedAnswer(flashcardToEdit.answer);
    setEditMode(true);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/${folder_name}/${note_id}/flashcards/${editedFlashcardId}/edit`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: storedToken,
          },
          body: JSON.stringify({
            question: editedQuestion,
            answer: editedAnswer,
          }),
        }
      );

      if (response.ok) {
        // Flashcard edited successfully, update the local state
        setFlashcards((prevFlashcards) =>
          prevFlashcards.map((flashcard) =>
            flashcard.flashcard_id === editedFlashcardId
              ? { ...flashcard, question: editedQuestion, answer: editedAnswer }
              : flashcard
          )
        );

        setEditMode(false);
        setEditedFlashcardId(null);
      } else {
        console.error("Failed to edit flashcard:", response.statusText);
      }
    } catch (error) {
      console.error("Error editing flashcard:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedFlashcardId(null);
  };

  const handleDeleteFlashcard = async (flashcardId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/${folder_name}/${note_id}/flashcards/${flashcardId}/delete`,
        {
          method: "DELETE",
          headers: {
            Authorization: storedToken,
          },
        }
      );

      if (response.ok) {
        // Flashcard deleted successfully, update the local state
        setFlashcards((prevFlashcards) =>
          prevFlashcards.filter(
            (flashcard) => flashcard.flashcard_id !== flashcardId
          )
        );
      } else {
        console.error("Failed to delete flashcard:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting flashcard:", error);
    }
  };
  return (
    <div className="flashcard-container">
      <UserNavbar username={username} />
      <div className="flashcard-main-content">
        <div className="d-flex justify-content-between align-items-center mx-5">
          <Link
            to={`../${folder_name}`}
            className="back-btn mb-4 mt-4 text-white"
          >
            {"<"} Back
          </Link>
          <button onClick={handleGoToNotes} className="button-style">Go to notes</button>
        </div>

        <div className="text-white d-flex justify-content-center mt-4">

          <div className={`flashcard ${editMode ? 'edit-mode' : ''}`}>
          <div className="card-index d-flex justify-content-center mb-2"><strong>Card {currentCardIndex + 1}</strong></div>
          {editMode && <div className="edit-mode-indicator text-center">EDIT MODE</div>}

            <div className="flashcard-content" onClick={handleFlip}>

              {flashcards.length > 0 ? (
                isFlipped ? (
                  <div className="back">
                    {editMode ? (
                      <div
                        className="editable"
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => setEditedAnswer(e.target.innerText)}
                        dangerouslySetInnerHTML={{ __html: editedAnswer }}
                      />
                    ) : (
                      flashcards[currentCardIndex].answer
                    )}
                  </div>
                ) : (
                  <div className="front">
                    {editMode ? (
                      <div
                        className="editable"
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => setEditedQuestion(e.target.innerText)}
                        dangerouslySetInnerHTML={{ __html: editedQuestion }}
                      />
                    ) : (
                      flashcards[currentCardIndex].question
                    )}
                  </div>
                )
              ) : (
                <div className="no-flashcards-message">
                  You have no flashcards.
                </div>
              )}
            </div>
            {flashcards.length > 0 && (
              <div className="button-container d-flex justify-content-between">
                {editMode ? (
                  <>
                    <button onClick={handleSaveEdit}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={handlePrevCard} className="button-style nav-button">
                    &lt; Prev
                    </button>
                    <div>
                      <button className="button-style" onClick={() => handleEditFlashcard(flashcards[currentCardIndex].flashcard_id)}>
                        Edit
                      </button>
                      <button className="button-style" onClick={() => handleDeleteFlashcard(flashcards[currentCardIndex].flashcard_id)}>
                        Delete
                      </button>
                    </div>

                    <button onClick={handleNextCard} className="button-style nav-button">
                      Next &gt;
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashcardPage;