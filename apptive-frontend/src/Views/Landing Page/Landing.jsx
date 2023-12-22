import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import React, { useEffect } from "react";

export const Landing = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/select");
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);

  return (
    <div className="d-flex flex-column">
      <Navbar />
      <div
        className="d-flex align-items-center justify-content-center h-100"
        style={{ minHeight: "90vh" }}
      >
        <div className="landing-content-container text-center p-4">
          <h1 className="landing-main-title text-white  mb-4 w-75">
            Make Studying Easier for you
          </h1>
          <p className="text-white fs-md mt-2 w-50">
            Compile and collect your notes in one application with a feature
            that allows you to create flashcards alongside your notes. Take a
            quiz with your flashcards to test your knowledge.
          </p>
          <button className="landing-home-button" onClick={handleGetStarted}>
            <strong>Get Started</strong>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
