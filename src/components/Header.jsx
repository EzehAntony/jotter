/** @format */

import React from "react";

import { Link } from "react-router-dom";
import "./header.css";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="header">
      <div className="logo">Jotter</div>
      <div className="menu">
        <ul>
          <Link to={"/home"}>Notes</Link>
          {user && <Link to={"/dashboard"}>{user.username}</Link>}
        </ul>
      </div>
    </div>
  );
}

export default Header;
