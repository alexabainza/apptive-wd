import React from "react";
import { Link, useNavigate } from "react-router-dom";
import BoxCard from "./BoxCard.jsx";

const Select = () => {
  const navigate = useNavigate();

  const handleGuestButtonClick = async () => {
    try {
      // Check if the "guestId" is already present in local storage
      const existingGuestId = localStorage.getItem("guestId");

      if (existingGuestId) {
        // If "guestId" exists, handle success (redirect to the guest dashboard)
        console.log("Using existing guest user ID:", existingGuestId);
        redirectToGuestDashboard(existingGuestId);
        return;
      }

      // If "guestId" does not exist, send a POST request to create a new guest user
      const response = await fetch("http://localhost:3000/createGuest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      if (response.ok) {
        // Parse the response JSON
        const data = await response.json();

        // Store the new user ID in local storage
        localStorage.setItem("guestId", data.guestId);

        // Handle success, e.g., redirect to the guest dashboard
        console.log("Guest user created successfully");
        console.log("New Guest ID:", data.guestId);
        redirectToGuestDashboard(data.guestId);
      } else {
        // Handle error
        console.error("Failed to create guest user");
      }
    } catch (error) {
      console.error("Error creating guest user", error);
    }
  };

  const redirectToGuestDashboard = (guestId) => {
    // Use 'navigate' to redirect to the guest dashboard with the guestId parameter
    navigate(`/${guestId}/community-notes`);
  };

  const handleClearLocalStorageClick = () => {
    // Clear the guestId from local storage
    localStorage.removeItem("guestId");
    console.log("Local storage cleared");
  };

  return (
    <div className="centercontainer">
      <div className="centercontent">
        <h2 className="signin">
          <strong>Sign in as</strong>
        </h2>
        <div>
          {/* Link to the guest dashboard */}
            <button onClick={handleGuestButtonClick}>
              <BoxCard icon="../../assets/guestIcon.svg" text="Guest" />
            </button>

          <Link to="/login">
            <button>
              <BoxCard icon="../../assets/memberIcon.svg" text="Member" />
            </button>
          </Link>
          <button onClick={handleClearLocalStorageClick}>
            Clear Local Storage
          </button>
        </div>
      </div>
    </div>
  );
};

export default Select;
