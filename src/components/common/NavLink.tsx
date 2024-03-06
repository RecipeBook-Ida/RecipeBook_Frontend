import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import React from "react";
interface NavLinkProps {
  to: string;
  text: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to, text }) => {
  const { pathname } = useLocation();
  const isActive = pathname === to;

  return (
    <li>
      <Link
        to={to}
        className={`hover:opacity-100 p-2 flex rounded-t-lg ${
          isActive
            ? "font-bold text-white hover:text-bookPrimary bg-bookBG"
            : "opacity-75 bg-bookSec text-bookPrimary"
        }`}
      >
        {text}
      </Link>
    </li>
  );
};
export default NavLink;
