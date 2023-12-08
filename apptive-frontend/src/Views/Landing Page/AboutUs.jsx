import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

export const AboutUs = () => {
   const navigate = useNavigate();

   return (
      <div className="dog d-flex flex-column h-100">
      <Navbar />

      </div>
   );
};

export default AboutUs;