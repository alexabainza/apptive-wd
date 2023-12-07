import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import BoxCard from './BoxCard.jsx';
import icon1 from '../../assets/guestIcon.svg';
import icon2 from '../../assets/memberIcon.svg';

const Select = () => {
     const navigate = useNavigate();

     const handleButtonClick = (destination) => {
     // You can add any logic here before navigating
     console.log(`Button clicked for ${destination}`);
     // Example: Navigate to the specified destination
     navigate(destination);
     };

     useEffect(() => {
       // Disable scrolling when the component mounts
       document.body.style.overflow = "hidden";
      
       // Re-enable scrolling when the component is unmounted
     return () => {
     document.body.style.overflow = "visible";
     };
     }, []);

     return (
       <div className="d-flex flex-column">
        <Navbar />
          <div className="centercontainer">
           <div className="centercontent">
             <h2 className="signin">
               <strong>Sign in as</strong>
             </h2>
            <div>
              <Link to="/guestdashboard">
               <button className="cardButton" onClick={() => handleButtonClick("/guestdashboard")}>
                 <BoxCard icon={icon1} text="Guest" />
               </button>
               </Link>   
               <Link to="/register">
                 <button className="cardButton" onClick={() => handleButtonClick("/register")}>
                    <BoxCard icon={icon2} text="Member" />
                 </button>
               </Link>
            </div>
          </div>
        </div>
       </div>
     );
};


export default Select;
