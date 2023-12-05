import React from "react";
import { Link } from "react-router-dom";
import BoxCard from './BoxCard.jsx';

const Select = () => {
     const handleButtonClick = (event) => {
          event.preventDefault(); // Prevent the default form submission behavior
          // You can add other logic here if needed
          };

     return (
          <div className="centercontainer">
          <div className="centercontent">
               <h2 className="signin">
                    <strong>Sign in as</strong>
               </h2>
               <div>
                    <Link to="">
                         <button onClick={handleButtonClick}><BoxCard icon='../../assets/guestIcon.svg' text="Guest" /></button>
                    </Link>
                    <Link to="/register">
                         <button onClick={handleButtonClick}><BoxCard icon='../../assets/memberIcon.svg' text="Member" /></button>  
                    </Link>
               </div>
          </div>
          </div>
     );
};


export default Select;
//BOBBY TO DO: link buttons to guest or member dashboards, css buttons on select
