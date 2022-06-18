import React from "react";
import styles from "./navbar.module.css";
import { Link } from "react-router-dom";
import { useStateContext } from "../../context/StateContext";

const navLinks = [
  { text: "shop", link: "/products" },
  { text: "about us", link: "/about" },
  { text: "contact", link: "/contact" },
  { text: "faqs", link: "/faqs" },
];
const path =
  "M289 357C367.459 359.648 446.597 361.569 524.778 353.111C579.86 347.152 670.426 337.699 699.667 280.556C708.752 262.801 709.619 240.611 710.556 221.222C712.282 185.476 709.2 152.947 685.111 124.444C657.225 91.4481 617.134 67.4187 578.556 49.2222C518.083 20.6988 451.251 6.43694 384.778 2.11111C276.933 -4.907 153.979 12.296 69.7777 85.8889C31.6442 119.218 -19.0311 185.241 9.22218 239.444C23.8063 267.424 53.3422 285.733 79.8888 300.333C132.883 329.48 189.528 336.917 249 342.444C307.369 347.869 366.132 351.201 424.778 350.556C476.603 349.985 524.314 339.917 575 331";

const Navbar = () => {
  return (
    <header className={styles.nav_container}>
      <Link to="/" className={styles.logo}>
        LOGO
      </Link>
      <ul className={styles.navbar_links}>
        {navLinks.map((navLink) => {
          return (
            <div className={styles.navbar_link_container} key={navLink.text}>
              <Link to={navLink.link} className={styles.navbar_link}>
                {navLink.text}
              </Link>
              <svg
                viewBox="0 0 712 360"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M289 357C367.459 359.648 446.597 361.569 524.778 353.111C579.86 347.152 670.426 337.699 699.667 280.556C708.752 262.801 709.619 240.611 710.556 221.222C712.282 185.476 709.2 152.947 685.111 124.444C657.225 91.4481 617.134 67.4187 578.556 49.2222C518.083 20.6988 451.251 6.43694 384.778 2.11111C276.933 -4.907 153.979 12.296 69.7777 85.8889C31.6442 119.218 -19.0311 185.241 9.22218 239.444C23.8063 267.424 53.3422 285.733 79.8888 300.333C132.883 329.48 189.528 336.917 249 342.444C307.369 347.869 366.132 351.201 424.778 350.556C476.603 349.985 524.314 339.917 575 331"
                  stroke="black"
                />
              </svg>
            </div>
          );
        })}
      </ul>
      <div className={styles.nav_end_links}>
        <Link to="/admin">
          <div className={styles.admin_link}>Admin</div>
        </Link>
        <Link to="/cart">
          <div className={styles.cart}>cart</div>
        </Link>
        <Link to="/checkout">
          <div className={styles.checkout}>checkout</div>
        </Link>
        <svg
          className={styles.hamburger_menu}
          width="50"
          height="23"
          viewBox="0 0 50 23"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="50" y1="0.5" y2="0.5" stroke="black" />
          <line x1="50" y1="11.5" y2="11.5" stroke="black" />
          <line x1="50" y1="22.5" y2="22.5" stroke="black" />
        </svg>
      </div>
    </header>
  );
};

export default Navbar;
