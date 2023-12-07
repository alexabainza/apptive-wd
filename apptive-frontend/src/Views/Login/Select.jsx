import React from "react";
import { Link } from "react-router-dom";
import BoxCard from "./BoxCard.jsx";

const Select = () => {
  const handleGuestButtonClick = async() =>{
    try {
      // Send a POST request to create a guest user
      const response = await fetch("http://localhost:3000/createGuest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}), // You can include additional data if needed
      });

      if (response.ok) {
        // Handle success, e.g., redirect to the guest dashboard
        console.log("Guest user created successfully");
      } else {
        // Handle error
        console.error("Failed to create guest user");
      }
    } catch (error) {
      console.error("Error creating guest user", error);
    }
  }
  return (
    <div className="centercontainer">
      <div className="centercontent">
        <h2 className="signin">
          <strong>Sign in as</strong>
        </h2>
        <div>
          {/* Link to the guest dashboard */}
          <Link to="/guestDashboard">
            <button onClick={handleGuestButtonClick}>
              <BoxCard icon="../../assets/guestIcon.svg" text="Guest" />
            </button>
          </Link>
          
          <Link to="/login">
            <button>
              <BoxCard icon="../../assets/memberIcon.svg" text="Member" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Select;
