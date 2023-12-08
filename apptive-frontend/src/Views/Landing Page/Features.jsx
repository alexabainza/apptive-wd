import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

export const Features = () => {
   const navigate = useNavigate();

   return (
      <div className="dog d-flex flex-column h-100">
      <Navbar />
      <div className="ftContainer text-white">
         <div className='mb-5 text-center'>
            {/* <img className="folderPic" src='../../assets/folderpic.png'></img> */}
            <h4><strong>Create Folders</strong></h4>
            <p>Keep your notes organized by keeping them in folders!</p>
         </div>
         <div className='mb-5 text-center'>
            <h4><strong>View Community Notes</strong></h4>
            <p>Keep your notes online and accessible for collaboration!</p>
         </div>
         <div className='mb-5 text-center'>
            <h4><strong>Create Flashcards</strong></h4>
            <p>Enhance your study experience with active recall!</p>
         </div>


      </div>
      </div>
   );
};

export default Features;