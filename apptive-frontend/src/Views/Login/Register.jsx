// UserLogin.jsx

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import apptiveLogo from '../../assets/APPTIVE_LOGO.png';

const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // New state for the message

  const navigate = useNavigate();

  function generateId() {
    return Math.floor(Math.random() * 1000000);
  }

  function handleForm(e) {
    e.preventDefault();
    if (!firstname || !lastname || !username || !email || !password) {
      setMessage("All fields must be filled in.");
      return;
    }
    let userData = {
      id: generateId(),
      username: username,
      password: password,
      firstname: firstname,
      lastname: lastname,
      email: email,
    };

    fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        // Redirect to the dashboard after successful login
        navigate(`/${userData.id}/dashboard`);
      })
      .catch((error) => console.error("Error during registration:", error));
    // hihelo
    setFirstname("");
    setLastname("");
    setPassword("");
    setUsername("");
    setEmail("");
  }

  return (
    <div className="register-whole-page d-flex flex-row">
      <div className="register-left-side w-50 text-white">
        <img
          className="w-100"
          src="https://picjumbo.com/wp-content/uploads/woman-holding-a-cup-of-coffee-while-writing-and-working-free-photo-2210x3315.jpg"
        ></img>
      </div>
      <div className="reigster-right-side w-50 mb-2 px-4 pt-5 d-flex flex-row justify-content-center align-items-start">
        <div className="register-right-contents w-75 d-flex flex-column justify-content-center">
          <div className="register-header text-center mb-2">
          <div
              className="login-header-app fs-3 mt-5 mb-4"
              style={{ fontColor: "d74242" }}
            >
              <Link className="navbar-app-name" to="/">
                <img className="imageLogo" src={apptiveLogo} />
              </Link>
            </div>
            <h2 className="text-white">
              <strong>Welcome back</strong>
              </h2>
            <p className="fs-5 text-white">Sign in to continue</p>
          </div>
          <form onSubmit={handleForm}>
            <div class="form-group mt-0 pt-0">
              <label className="text-white">
                <small>First Name</small>
              </label>
              <input
                type="text"
                name="firstname"
                className="form-control text-white"
                style={{ backgroundColor: "#37425F" }}
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div class="form-group mt-2">
              <label className="text-white">
                <small>Last Name</small>
              </label>
              <input
                style={{ backgroundColor: "#37425F" }}
                type="text"
                name="lastname"
                className="form-control text-white"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
            <div class="form-group mt-2">
              <label className="text-white">
                <small>Enter email</small>
              </label>
              <input
                type="email"
                name="email"
                style={{ backgroundColor: "#37425F" }}
                className="form-control text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div class="form-group mt-2">
              <label className="text-white">
                <small>Enter username</small>
              </label>
              <input
                type="text"
                className="form-control text-white"
                style={{ backgroundColor: "#37425F" }}
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div class="form-group mt-2">
              <label className="text-white">
                <small>Password</small>
              </label>
              <div className="input-group">
                <input
                  style={{ backgroundColor: "#37425F" }}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="form-control text-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="input-group-append">
                  <button
                    type="button"
                    className="btn btn-link text-white"
                    style={{ border: "none", background: "transparent" }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <small>{showPassword ? "Hide" : "Show"}</small>
                  </button>
                </div>
              </div>
            </div>
            <button type="submit" class="register-submit-button my-3">
              <strong>Submit</strong>
            </button>
          </form>
          {message && <small style={{ color: "red" }}>{message}</small>}

          <small className="text-white text-center">
            Already registered?{" "}
            <Link to="/login" style={{ color: "#D74242" }}>
              <strong>Login</strong>
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Register;
