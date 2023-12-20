// FlashcardPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import UserNavbar from "../Dashboard/UserNavbar";

const FlashcardPage = ({ highlightedTextQuestion, highlightedTextAnswer }) => {
  const { folder_name, note_id } = useParams();
  const [isFlipped, setFlipped] = useState(false);
  const [flashcards, setFlashcards] = useState([]);
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
          setFlashcards(data.data);
        } else {
          console.error("Error fetching flashcards:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching flashcards:", error);
      });
  }, [folder_name, note_id, storedToken]);

  const handleFlip = () => {
    setFlipped(!isFlipped);
  };

  const handleGoToNotes = () => {
    navigate(`../${folder_name}/${note_id}`);
  };

  return (
    <div className="flashcard-container">
      <UserNavbar />
      <div className="flashcard-main-content">
        <div className="d-flex justify-content-between align-items-center mx-5">
          <Link
            to={`../${folder_name}/${note_id}`}
            className="back-btn mb-4 mt-4 text-white"
          >
            {"<"} Back
          </Link>
          <button onClick={handleGoToNotes}>Go to notes</button>
        </div>
        <div>
          <div className="flashcard mx-5">
            <div className="flashcard-content" onClick={handleFlip}>
              {flashcards && flashcards.length > 0 ? (
                flashcards.map((flashcard, index) => (
                  <div
                    key={index}
                    className={isFlipped ? "back" : "front"}
                  >
                    {isFlipped ? flashcard.answer : flashcard.question}
                  </div>
                ))
              ) : (
                <div className="no-flashcards-message">
                  You have no flashcards.
                </div>
              )}
            </div>
            {flashcards && flashcards.length > 0 && (
              <div className="button-container">
                {/* You can add your navigation buttons here if needed */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashcardPage;
