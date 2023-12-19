import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./Views/Login/Register";
import Dashboard from "./Views/Dashboard/Dashboard";
import Landing from "./Views/Landing Page/Landing";
import Login from "./Views/Login/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Profile from "./Views/Profile/Profile";
import "./app.css";
import NotesPage from "./Views/Notes/NotesPage";
import IndivNote from "./Views/Notes/IndivNote";
import AddNotesPage from "./Views/Notes/AddNotesPage";
import Select from "./Views/Login/Select";
import CommunityDashboard from "./Views/CommunityUser/CommunityDashboard";
import CommunityIndivNote from "./Views/CommunityUser/CommunityIndivNote";
import ViewProfile from "./Views/Profile/ViewProfile";
import Features from "./Views/Landing Page/Features";
import AboutUs from "./Views/Landing Page/AboutUs"
import UserNavbar from "./Views/Dashboard/UserNavbar";
function App() {
  // const token = localStorage.getItem("token");
  // let username = "";
  // if (token) {
  //   // Decode the JWT token to get user information
  //   const decodedToken = jwt_decode(token);
  //   username = decodedToken.username;
  // }
  return (
    <BrowserRouter>
      {/* {token && <UserNavbar username={username} token={token} />} Pass the token as a prop */}

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/:folder_name/:note_id" element={<IndivNote />} />
        <Route path="/:folder_name" element={<NotesPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/select" element={<Select />} />
        <Route
          path="/:folder_name/addNote"
          element={<AddNotesPage />}
        />
        <Route
          path="/community-notes/:note_id"
          element={<CommunityIndivNote />}
        />
        <Route path="/:person_id/community-notes/:note_id" element={<CommunityIndivNote/>} />
        <Route path="/:community-notes" element = {<CommunityDashboard/>}/>
        {/* <Route path="/:person_id/community-notes" element={<GuestDashboard />} /> */}
        <Route path="/viewProfile/:username" element={<ViewProfile />} />
        <Route path="/features" element={<Features />} />
        <Route path="/aboutus" element={<AboutUs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
