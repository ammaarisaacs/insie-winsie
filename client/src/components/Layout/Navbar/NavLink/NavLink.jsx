import { Link } from "react-router-dom";
// import svg paths
//

const NavLink = ({ totalQty, to }) => {
  let content;

  if (totalQty) {
    content = <></>;
  }

  return <Link>{content}</Link>;
};

export default NavLink;
