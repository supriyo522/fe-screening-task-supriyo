// Navbar.js
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav>
    <ul className="nav-list">
      <li className="nav-item">
        <Link to="/">Home</Link>
      </li>
    </ul>
  </nav>
);

export default Navbar;
