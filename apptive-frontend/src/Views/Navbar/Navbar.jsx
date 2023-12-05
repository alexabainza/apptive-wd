import React from "react";
import { Link } from "react-router-dom";
import apptiveLogo from '../../assets/APPTIVE_LOGO.png';

const Navbar = () => {
  return (
    <>
      <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-* px-4">
        <div className="navbar-left">
          <Link className="navbar-app-name" to="/">
            <img className="imageLogo" src={apptiveLogo} />
          </Link>
        </div>
        <div className="d-flex align-items-center">
          <ul className="navbar-nav">
            <li className="nav-item ml-5">
              <Link className="navbar-feat nav-link text-white" href="#">
                <div className="word-container">
                  Features
                </div>
              </Link>
            </li>
            <li className="nav-item ms-5">
              <Link className="navbar-feat nav-link text-white" href="#">
                <div className="word-container">
                    Contact Us
                </div>
              </Link>
            </li>
            <li className="nav-item ms-5">
              <Link className="navbar-feat nav-link text-white" href="#">
                <div className="word-container">
                  About Us
                </div>
              </Link>
            </li>
            {/* <p className="text-white fs-3">|</p> */}
            <li className="nav-item ms-5">
              <Link className="nav-link text-white" to="/login">
                <button className="navbar-login btn btn-transparent text-white" >
                  <div>
                    Login
                  </div>
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
