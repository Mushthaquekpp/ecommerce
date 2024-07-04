import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
const Footer = () => {
  return (
    <div className=" footer-container">
      <div className="footer-heading">All Right Reserved ©️</div>

      <div className="footer-link">
        <Link to="/about">About</Link> &nbsp;| &nbsp;
        <Link to="/contact">Contact</Link> &nbsp;| &nbsp;
        <Link to="/policy">Privacy Policy</Link>
      </div>
    </div>
  );
};

export default Footer;
