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
        className={`hover:opacity-100 ${isActive ? "font-bold hover:text-white" : "opacity-75"}`}
      >
        {text}
      </Link>
    </li>
  );
};
export default NavLink;
