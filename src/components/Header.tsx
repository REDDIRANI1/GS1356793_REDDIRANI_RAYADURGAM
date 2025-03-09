import React from "react";
import { FaUserCircle } from "react-icons/fa"; // Profile icon
import { IoMdArrowDropdown } from "react-icons/io"; // Dropdown arrow
import "../css/Header.css"; // Ensure proper styling

const Header: React.FC = () => {
  return (
    <header className="app-header">
      <h1 className="app-title">Data Viewer App</h1>
      <div className="profile-container">
        <FaUserCircle className="profile-icon" />
        <IoMdArrowDropdown className="dropdown-arrow" />
      </div>
    </header>
  );
};

export default Header;
