import React from "react";
import footerStyles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={footerStyles.container}>
      <div>Icon</div>
      <address>
        <p>Street</p>
        <p>Area</p>
        <p>Contact</p>
        <p>Email</p>
      </address>
      <ul>
        <li>fb</li>
        <li>tw</li>
        <li>insta</li>
      </ul>
      <small>Copyright Info</small>
    </footer>
  );
};

export default Footer;
