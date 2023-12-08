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
import GuestDashboard from "./Views/Guest/GuestDashboard";
import CommunityIndivNote from "./Views/Guest/CommunityIndivNote";
import ViewProfile from "./Views/Profile/ViewProfile";
import Features from "./Views/Landing Page/Features";
import AboutUs from "./Views/Landing Page/AboutUs"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/:user_id/dashboard" element={<Dashboard />} />
        <Route path="/:user_id/:folder_name/:note_id" element={<IndivNote />} />
        <Route path="/:user_id/:folder_name" element={<NotesPage />} />
        <Route path="/:user_id" element={<Profile />} />
        <Route path="/select" element={<Select />} />
        <Route
          path="/:user_id/:folder_name/addNote"
          element={<AddNotesPage />}
        />
        <Route
          path="/community-note/:note_id"
          element={<CommunityIndivNote />}
        />
        <Route path="/:person_id/community-notes/:note_id" element={<CommunityIndivNote/>} />

        <Route path="/:person_id/community-notes" element={<GuestDashboard />} />
        <Route path="/viewProfile/:username" element={<ViewProfile />} />
        <Route path="/features" element={<Features />} />
        <Route path="/aboutus" element={<AboutUs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
