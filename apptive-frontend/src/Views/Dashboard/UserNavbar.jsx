import React from "react";
import { Link, useNavigate } from "react-router-dom";
import apptiveLogo from "../../assets/APPTIVE_LOGO.png";

const UserNavbar = ({username, token}) => {
  const navigate = useNavigate();
  const handleProfile = () => {
    navigate(`/${user_id}`);
  };

  const handleDashboard = () => {
    console.log("username is + " + username)
    navigate(`/dashboard`, { state: { username } });
  };
  const handleLogout = async () => {
    try {
      // Call the logout endpoint on the server
      const logoutResponse = await fetch("http://localhost:3000/logout", {
        method: "POST",
        headers: {
          Authorization: `${token}`, // Include "Bearer" before the token
        },
      });

      if (logoutResponse.ok) {
        // Remove the token from local storage
        localStorage.removeItem("token");
        // Navigate to the login page or perform other logout actions
        navigate("/login");
      } else {
        console.error("Failed to logout:", logoutResponse.status);
        // Handle logout failure here
      }
    } catch (error) {
      console.error("Error during logout:", error);
      // Handle logout error here
    }
  };

  return (
    <>
      <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-* px-4">
        <div className="navbar-left">
          <Link
            className="navbar-app-name navbar-brand text-white fs-3"
            to="/"
          >
            <img className="imageLogo" src={apptiveLogo} />
          </Link>
        </div>
        <div className="navbar-right d-flex align-items-center">
          <ul className="navbar-nav">
            <li className="nav-item me-4">
              <button
                className="navbar-feat nav-link text-white"
                onClick={handleDashboard}
              >
                Dashboard
              </button>
            </li>
            <li className="nav-item me-4">
              <Link
                className="navbar-feat nav-link text-white"
                // to={`/${user_id}/community-notes`}
              >
                Community
              </Link>
            </li>
            <li>
              <div className="collapse navbar-collapse ms-5 me-3">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <button
                      className="user-navbar-dropdown btn btn-primary nav-link fw-bold px-3 rounded"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      style={{ color: "#d74242" }}
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {username ? username : "username"}
                    </button>
                    <ul
                      className="dropdown-menu dropdown-menu-end"
                      style={{ width: "5vw", backgroundColor: "#37425F" }}
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <Link
                          className="dropdown-item text-white"
                          to={`/profile`}
                          onClick={handleProfile}
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item text-white"
                          to="/login"
                          onClick={handleLogout}
                        >
                          Sign out
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default UserNavbar;
