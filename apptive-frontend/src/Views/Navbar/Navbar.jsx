import React from "react";
import { Link } from "react-router-dom";
import apptiveLogo from '../../assets/APPTIVE_LOGO.png';

const Navbar = () => {
  return (
    <>
      <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-* px-4">
        <div className="navbar-left">
        <Link className="navbar-app-name navbar-brand text-white fs-3" to="/">
          <img className="imageLogo" src={apptiveLogo} />
          </Link>
        </div>
        <div className="d-flex align-items-center ml-auto">
          <ul className="navbar-nav">
          <li className="textnav nav-item ml-5">
              <Link className="navbar-feat nav-link text-white" href="#">
                Features
              </Link>
            </li>
            <li className="textnav nav-item ml-5">
              <Link className="navbar-feat nav-link text-white" href="#">
                Contact Us
              </Link>
            </li>
            <li className="textnav nav-item ml-5">
              <Link className="navbar-feat nav-link text-white" href="#">
                About Us
              </Link>
            </li>
            {/* <p className="text-white fs-3">|</p> */}
            <li className="textnav nav-item ml-5">
              <Link className="nav-link text-white" to="/login">
                Log In
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;