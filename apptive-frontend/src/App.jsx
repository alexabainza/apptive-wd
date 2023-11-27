// App.jsx

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

import Navbar from "./Views/Navbar/Navbar";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/:user_id/dashboard" element={<Dashboard />} />
        <Route path="/:user_id" element={<Profile />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
