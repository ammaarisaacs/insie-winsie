import React from "react";
import footerStyles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={footerStyles.container}>
      <div>Icon</div>
      <div>
        <p>Street</p>
        <p>Area</p>
        <p>Contact</p>
        <p>Email</p>
      </div>
      <div>
        <span>fb</span>
        <span>tw</span>
        <span>insta</span>
      </div>
      <div>Copyright Info</div>
    </footer>
  );
};

export default Footer;
