import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apptiveLogo from '../../assets/APPTIVE_LOGO.png';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(""); // New state for the message
  const navigate = useNavigate();

  function handleForm(e) {
    e.preventDefault();

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          // Redirect to the dashboard after successful login
          const userId = data.user_id;
          navigate(`/${data.user_id}/dashboard`, { state: { username } });
        } else {
          // Handle unsuccessful login
          setMessage(`Login failed: ${data.message}`);
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
        setMessage(`An unexpected error occurred: ${error.message}`);
      });
  }

  return (
    <div className="login-whole-page d-flex flex-row">
      <div className="login-left-side w-50 text-white">
        <img
          className="w-100"
          src="https://picjumbo.com/wp-content/uploads/woman-holding-a-cup-of-coffee-while-writing-and-working-free-photo-2210x3315.jpg"
        ></img>
      </div>
      <div className="login-right-side w-50 px-4 pt-5 d-flex flex-row justify-content-center align-items-start">
        <div className="login-right-contents w-75 d-flex flex-column justify-content-center">
          <div className="login-header text-center mb-5">
            <div
              className="login-header-app fs-3 mt-5 mb-4"
              style={{ fontColor: "d74242" }}
            >
              <Link className="navbar-app-name" to="/">
                <img className="imageLogo" src={apptiveLogo} />
              </Link>
            </div>
            <h2 className="text-white"><strong>Welcome back</strong></h2>
            <p className="fs-5 text-white mb-0">Sign in to continue</p>
          </div>
          <form onSubmit={handleForm}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1" className="text-white">
                <small>
                  <strong>USERNAME</strong>
                </small>
              </label>
              <input
                type="text"
                className="form-control text-white"
                style={{ backgroundColor: "#37425F" }}
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
              />
            </div>
            <div className="form-group my-4">
              <label htmlFor="exampleInputPassword1" className="text-white">
                <small>
                  <strong>PASSWORD</strong>
                </small>
              </label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control text-white"
                  style={{ backgroundColor: "#37425F" }}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
                <div className="input-group-append">
                <button
                  type="button"
                  className="btn btn-link text-white"
                  style={{border: "none", background: "transparent"}}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <small>{showPassword ? "Hide" : "Show"}</small>
                </button>
                </div>
              </div>
            </div>
            <button type="submit" className="login-submit-button">
              <strong>Submit</strong>
            </button>
          </form>
          ;{message && <p style={{ color: "red" }}>{message}</p>}
          <small className="text-white text-center">
            Haven't registered yet?{" "}
            <Link
              to="/register"
              style={{ color: "#D74242" }}
            >
              <strong>Sign up</strong>
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Login;
