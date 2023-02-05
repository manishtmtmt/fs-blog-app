import React from "react";
import { AiFillFileAdd, AiOutlineHome } from "react-icons/ai";
import { NavLink } from "react-router-dom";

const NavItem = ({ to, value, Icon, closed }) => {
  const commonClasses =
    "flex items-center space-x-2 w-full p-2 block whitespace-nowrap";
  const activeClass = `${commonClasses} bg-blue-500 text-white`;
  const inActiveClass = `${commonClasses} text-gray-500`;
  return (
    <NavLink
      className={({ isActive }) => (isActive ? activeClass : inActiveClass)}
      to={to}
    >
      {Icon}{" "}
      <span
        className={
          closed
            ? "w-0 transition-width overflow-hidden"
            : "w-full transition-width overflow-hidden"
        }
      >
        {value}
      </span>
    </NavLink>
  );
};

const Navbar = ({ closed }) => {
  return (
    <nav>
      {/* Add your logo */}
      <div className="flex justify-center p-3">
        <img className="w-14" src="" alt="" />
      </div>
      <ul>
        <li>
          <NavItem
            closed={closed}
            to="/"
            value="Home"
            Icon={<AiOutlineHome size={24} />}
          />
        </li>
        <li>
          <NavItem
            closed={closed}
            to="/create-post"
            value="Create Post"
            Icon={<AiFillFileAdd size={24} />}
          />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
