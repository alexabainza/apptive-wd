import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import UserNavbar from "../Dashboard/UserNavbar";

const FlashcardPage = () => {
  const { folder_name, note_id } = useParams();
  const [isFlipped, setFlipped] = useState(false);
  const [flashcards, setFlashcards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const storedToken = localStorage.getItem("token");
  const navigate = useNavigate();

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
      <UserNavbar />
      <div className="flashcard-main-content">
        <div className="d-flex justify-content-between align-items-center mx-5">
          <Link
            to={`../${folder_name}`}
            className="back-btn mb-4 mt-4 text-white"
          >
            {"<"} Back
          </Link>
          <button onClick={handleGoToNotes}>Go to notes</button>
        </div>
        <div>
          <div className="flashcard mx-5">
            <div className="flashcard-content" onClick={handleFlip}>
              {flashcards.length > 0 ? (
                isFlipped ? (
                  <div className="back">
                    {flashcards[currentCardIndex].answer}
                  </div>
                ) : (
                  <div className="front">
                    {flashcards[currentCardIndex].question}
                  </div>
                )
              ) : (
                <div className="no-flashcards-message">
                  You have no flashcards.
                </div>
              )}
            </div>
            {flashcards.length > 0 && (
              <div className="button-container">
                <button onClick={handlePrevCard} className="nav-button">
                  &lt; Prev
                </button>
                <div className="card-index">Card {currentCardIndex + 1}</div>
                <button onClick={handleNextCard} className="nav-button">
                  Next &gt;
                </button>
              </div>
            )}
          </div>
        </div>
        {flashcards.length > 0 && (
          <button onClick={() => handleDeleteFlashcard(flashcards[currentCardIndex].flashcard_id)}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default FlashcardPage;
