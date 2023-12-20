// FlashcardPage.jsx
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";

const FlashcardPage = ({ highlightedTextQuestion, highlightedTextAnswer }) => {
    const { user_id, folder_name, note_id } = useParams();
  const [isFlipped, setFlipped] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const handleFlip = () => {
    setFlipped(!isFlipped);
  };
  const handleNextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % flashcardData.length);
    setFlipped(false); // Reset flip state when moving to the next card
  };

  const handlePrevCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex - 1 + flashcardData.length) % flashcardData.length);
    setFlipped(false); // Reset flip state when moving to the previous card
  };
  // Assuming you have some data for your flashcard
  const flashcardData = [
    { front: highlightedTextQuestion, back: highlightedTextAnswer},
    // { front:  back: 'Yellowstone National Park' },
    { front: 'Often it is a reserve of natural, semi-natural, or developed land that a government declares or owns in use for conservation of wild nature for posterity and as a symbol of national pride', back: 'national parks' },
    { front: 'was the first national park in the U.S. and is also widely held to be the first national park in the world', back: 'Yellowstone National Park' },
    { front: 'this is the only National Park in Switzerland', back: 'Swiss National Park' },
    { front: 'in Gunung Mulu National Park in Sarawak, Malaysia and famous for its striking limestone karst formations, commonly called "the pinnacles"', back: 'Mount Api' },
    { front: 'who are to supervise, manage, and/or perform work in the conservation and use of park resources.', back: 'park ranger' },
];

return (
    <div>

      <div className="flashcard-container">
      
        <div className="flashcard">
        {/* <Link to = {`../${user_id}/${folder_name}`} className="mb-5" >{"<"}   Go Home </Link> */}
          <div
            className="flashcard-content"
            onClick={handleFlip}
          >
            {isFlipped ? <div className="back">{flashcardData[currentCardIndex].back}</div> : <div className="front">{flashcardData[currentCardIndex].front}</div>}
          </div>
          <div className="button-container">
            <button onClick={handlePrevCard} className="nav-button">&lt; Prev</button>
            <div className="card-index">Card {currentCardIndex + 1}</div>
            <button onClick={handleNextCard} className="nav-button">Next &gt;</button>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default FlashcardPage;