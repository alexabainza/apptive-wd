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
import ChooseUser from "./Views/ChooseUser/ChooseUser";

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
        <Route path="/chooseUser" element={<ChooseUser/>} />

        <Route
          path="/:user_id/:folder_name/addNote"
          element={<AddNotesPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
