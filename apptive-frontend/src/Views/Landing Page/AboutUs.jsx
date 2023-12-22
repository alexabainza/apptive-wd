import Navbar from "../Navbar/Navbar";
import alex from "../../assets/alex.png";
import anthon from "../../assets/anthon.png";
import budz from "../../assets/budz.png";
import bobby from "../../assets/bobby.png";

export const AboutUs = () => {
  return (
    <div className="dog d-flex flex-column h-100">
      <Navbar />
      <div className="headerteam mb-5 d-flex justify-content-between align-items-end mx-auto">
        <h2 className="aboutUs">
          <strong>About Us</strong>
        </h2>
        <p className="teamApptive">Team Apptive</p>
      </div>
      <div className="theTeam d-flex justify-content-center align-items-center mx-auto">
        <div className="memberCard text-white d-flex flex-column align-items-center">
          <img className="imageURL" src={alex} alt="alex" />
          <h4>Alex Abainza</h4>
          <p>
            <small>Full Stack Developer</small>
          </p>
        </div>
        <div className="memberCard text-white d-flex flex-column align-items-center">
          <img className="imageURL" src={anthon} alt="anthon" />
          <h4>Anthon Gonzales</h4>
          <p>
            <small>Frontend Developer</small>
          </p>
        </div>
        <div className="memberCard text-white d-flex flex-column align-items-center">
          <img className="imageURL" src={budz} alt="raphael" />
          <h4>Raphael Matres</h4>
          <p>
            <small>Backend Developer</small>
          </p>
        </div>
        <div className="memberCard text-white d-flex flex-column align-items-center">
          <img className="imageURL" src={bobby} alt="bobby" />
          <h4>Fabiola Villanueva</h4>
          <p>
            <small>UI/UX Designer</small>
          </p>
        </div>
      </div>
      <div className="visionCont d-flex flex-column justify-content-center align-items-center mx-auto">
        <h5 className="text-white">Vision</h5>
        <p className="text-white">
          An efficient and convenient approach to test one’s knowledge that
          allows direct source and relation from the user’s notes while
          studying. Consequently promoting collaboration as it allows community
          sharing of notes and flashcards.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
