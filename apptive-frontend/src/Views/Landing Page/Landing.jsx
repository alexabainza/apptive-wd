import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

export const Landing = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    // Redirect to another page when the "Get Started" button is clicked
    navigate("/register"); // Replace "/your-target-route" with the desired route
  };

  return (
    <div className="d-flex flex-column">
      <Navbar />
      <div
        className="d-flex align-items-center justify-content-center h-100"
        style={{ minHeight: "90vh" }}
      >
        <div className="landing-content-container text-center p-4">
          <h1 className="landing-main-title text-white  mb-4 w-75">
            Making Studying Easier for you
          </h1>
          <p className="text-white fs-4 mt-2 w-50">
            An app that lets you take notes while seamlessly integrating a
            quizzing feature. Take notes like you normally would and in just a
            few clicks you can format it into a quiz to test your knowledge.
          </p>
          <button className="landing-home-button" onClick={handleGetStarted}>
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
