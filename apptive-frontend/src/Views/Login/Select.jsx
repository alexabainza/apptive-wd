import React from "react";
import { Link, useNavigate } from "react-router-dom";
import BoxCard from "./BoxCard.jsx";
import guesticon from "../../assets/guestIcon.svg";
import membericon from "../../assets/memberIcon.svg";
import Navbar from "../Navbar/Navbar.jsx";
const Select = () => {
  const navigate = useNavigate();

  const handleGuestButtonClick = async () => {
    try {
      const existingGuestId = localStorage.getItem("guestId");

      if (existingGuestId) {
        redirectToGuestDashboard(existingGuestId);
        return;
      }

      const response = await fetch("http://localhost:3000/createGuest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      if (response.ok) {
        const data = await response.json();

        localStorage.setItem("guestId", data.guestId);

        console.log(`Guest user created successfully ${data.guestId}`);
        redirectToGuestDashboard(data.guestId);
      } else {
        console.error("Failed to create guest user");
      }
    } catch (error) {
      console.error("Error creating guest user", error);
    }
  };

  const redirectToGuestDashboard = (guestId) => {
    navigate(`/${guestId}/community-notes`);
  };

  const handleClearLocalStorageClick = () => {
    localStorage.removeItem("guestId");
    console.log("Local storage cleared");
  };

  return (
    <div className="select-whole-page d-flex flex-column">
      <Navbar />
      <div className="centercontent">
        <h2 className="signin mb-3">
          <strong>Sign in as</strong>
        </h2>
        <div className="d-flex flex-column">
          <div className="d-flex mb-4">
            <button onClick={handleGuestButtonClick}>
              <BoxCard icon={guesticon} text="Guest" />
            </button>

            <Link to="/login">
              <button>
                <BoxCard icon={membericon} text="Member" />
              </button>
            </Link>
          </div>

          <button onClick={handleClearLocalStorageClick}>
            Clear Local Storage
          </button>
        </div>
      </div>
    </div>
  );
};

export default Select;
