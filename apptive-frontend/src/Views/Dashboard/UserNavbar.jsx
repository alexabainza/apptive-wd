import React from "react";
import { Link, useNavigate } from "react-router-dom";
const UserNavbar = ({ username, user_id }) => {
    const navigate = useNavigate();
  
    const handleProfile = () => {
      navigate(`/${user_id}`);
    };
  
    const handleLogout = () => {
      navigate("/login");
    };
  return (
    <>
      <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-* px-4">
        <div className="navbar-left">
          <Link
            className="navbar-app-name navbar-brand text-white fs-3"
            to="/home"
          >
            APPTIVE
          </Link>
        </div>
        <div className="navbar-right d-flex align-items-center">
          <ul className="navbar-nav">
            <li className="nav-item me-4">
              <Link className="navbar-feat nav-link text-white" href="#">
                Favorites
              </Link>
            </li>
            <li className="nav-item me-4">
              <Link className="navbar-feat nav-link text-white" href="#">
                Recent
              </Link>
            </li>
            <li className="nav-item me-4">
              <Link className="navbar-feat nav-link text-white" href="#">
                Notifications
              </Link>
            </li>
            <li className="nav-item me-4">
              <Link className="navbar-feat nav-link text-white" href="#">
                Home
              </Link>
            </li>
            <li>
              <div className="collapse navbar-collapse ms-5 me-3">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <a
                      className="user-navbar-dropdown nav-link fw-bold px-3 rounded"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      style={{color: "#d74242"}}
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {username}
                    </a>
                    <ul
                      className="dropdown-menu dropdown-menu-end" style={{width: "5vw", backgroundColor: "#37425F"}}
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <Link className="dropdown-item text-white" to={`/${user_id}`} onClick={handleProfile}>
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="/login" onClick={handleLogout}>
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
