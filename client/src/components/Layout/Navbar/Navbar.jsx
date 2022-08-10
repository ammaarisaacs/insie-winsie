import { useState } from "react";
import navStyles from "./navbar.module.css";
import Menu from "../../Menu/Menu";
import { useStateContext } from "../../../context/StateContext";
import { navLinks } from "../../../data/links";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const path =
  "M289 357C367.459 359.648 446.597 361.569 524.778 353.111C579.86 347.152 670.426 337.699 699.667 280.556C708.752 262.801 709.619 240.611 710.556 221.222C712.282 185.476 709.2 152.947 685.111 124.444C657.225 91.4481 617.134 67.4187 578.556 49.2222C518.083 20.6988 451.251 6.43694 384.778 2.11111C276.933 -4.907 153.979 12.296 69.7777 85.8889C31.6442 119.218 -19.0311 185.241 9.22218 239.444C23.8063 267.424 53.3422 285.733 79.8888 300.333C132.883 329.48 189.528 336.917 249 342.444C307.369 347.869 366.132 351.201 424.778 350.556C476.603 349.985 524.314 339.917 575 331";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(null);
  const { totalQty } = useStateContext();

  const navigate = useNavigate();

  const draw = {
    selected: { pathLength: 1 },
    unselected: { pathLength: 0 },
  };

  const menuProps = {
    show,
    setShow,
    links: navLinks,
  };

  return (
    <header className={navStyles.nav_container}>
      <Link to="/">
        <img
          className={navStyles.logo}
          src={require("../../../assets/images/logo.png")}
          alt=""
        />
      </Link>
      <nav className={navStyles.navbar_links}>
        {navLinks.map(({ url, text }, i) => {
          return (
            <div className={navStyles.navbar_link_container} key={text}>
              <Link
                to={url}
                className={navStyles.navbar_link}
                onClick={() => setSelected(i)}
              >
                {text}
              </Link>
              <svg
                viewBox="0 0 712 360"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  variants={draw}
                  initial={{ pathLength: 0 }}
                  transition={{ duration: 1 }}
                  animate={selected == i ? "selected" : "unselected"}
                  d={path}
                  stroke="black"
                />
              </svg>
            </div>
          );
        })}
      </nav>
      <nav className={navStyles.nav_end_links}>
        <div className={navStyles.cart_link}>
          <motion.svg
            whileHover={{ y: -5 }}
            className={navStyles.cart}
            viewBox="0 0 90 73"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => {
              setShow(false);
              setSelected(null);
              navigate("./cart");
            }}
          >
            <path
              d="M0 0.5H7C10.3333 0.666667 17 2.9 17 10.5C17 18.1 17 22.6667 17 24H89L75 53H17V29H10.5V62H75"
              stroke="black"
            />
            <circle cx="12.5" cy="67.5" r="5.5" fill="black" />
            <circle cx="71.5" cy="67.5" r="5.5" fill="black" />
          </motion.svg>
          {totalQty > 0 && (
            <motion.span
              layout
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {totalQty}
            </motion.span>
          )}
        </div>
        {totalQty > 0 && (
          <motion.svg
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className={navStyles.checkout}
            width="134"
            height="85"
            viewBox="0 0 134 85"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => {
              setShow(false);
              setSelected(null);
              navigate("./checkout");
            }}
          >
            <path
              d="M54.3407 45L90.6091 6.14711C96.2489 0.0790529 105.74 -0.268084 111.808 5.37176L128.655 21.0299C134.723 26.6698 135.07 36.1609 129.431 42.2289L95.391 78.8529C89.7512 84.921 80.2601 85.2681 74.192 79.6283L51.5 58.5"
              stroke="black"
            />
            <path
              d="M70.5 29H49.5C46.6667 29.1667 39.6 30.9 34 36.5C28.4 42.1 9.33333 59.8333 0.5 68M49.5 45H75C89.5 45 88.6 56.5 75 56.5C61.4 56.5 51.3333 57.8333 48 58.5C47.6667 61.6667 44.4 68 34 68M60.5 68C51.8333 75.6667 35.5 88.5 25.5 78.5"
              stroke="black"
            />
          </motion.svg>
        )}
        <svg
          className={navStyles.hamburger_menu}
          width="50"
          height="23"
          viewBox="0 0 50 23"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => setShow(!show)}
        >
          <line x1="50" y1="0.5" y2="0.5" stroke="black" />
          <line x1="50" y1="11.5" y2="11.5" stroke="black" />
          <line x1="50" y1="22.5" y2="22.5" stroke="black" />
        </svg>
        <Menu {...menuProps} />
      </nav>
    </header>
  );
};

export default Navbar;
