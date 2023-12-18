import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apptiveLogo from '../../assets/APPTIVE_LOGO.png';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(""); // New state for the message
  const [loginStatus, setLoginStatus] = useState(false);
  const navigate = useNavigate();

  const userAuthenticated = () => {
    fetch("http://localhost:3000/isUserAuthenticated", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Check if the response indicates authentication
        if (data.message === "you are valid") {
          console.log("User is authenticated");
        } else {
          console.log("User is not authenticated");
        }
      })
      .catch((error) => {
        console.error("Error during authentication:", error);
      });
  };
  


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

        if(data.auth){
        // if (data.success) {
          // Redirect to the dashboard after successful login
          const userId = data.user_id;
          localStorage.setItem("token", data.token)
          setLoginStatus(true)
          // navigate(`/${data.user_id}/dashboard`, { state: { username } });
        } else {
          setLoginStatus(false)

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
          <Link className="navbar-app-name navbar-brand text-white fs-3" to="/">
              <img className="imageLogo" src={apptiveLogo} />
            </Link>
            <h2 className="text-white mt-4"><strong>Welcome back</strong></h2>
            <p className="fs-5 text-white mb-0">Login to continue</p>  
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
            <div className="form-group my-4 mt-0">

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
            <Link to="/register" style={{ color: "#D74242" }}>
              <strong>Sign up</strong>
            </Link>
          </small>
        </div>
        {loginStatus && (
        <button onClick={userAuthenticated}>Check if authenticated</button>
      )}
      </div>

    </div>
  );
};

export default Login;
