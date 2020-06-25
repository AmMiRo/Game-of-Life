import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <h1>Game of Life</h1>
      <div className="small-container">
        <Link className="links" to="/">
          Game
        </Link>
        <Link className="links" to="/info">
          Info
        </Link>
      </div>
    </div>
  );
};

export default Header;
