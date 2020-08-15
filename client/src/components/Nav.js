import React from "react";
import "../App.css";
import { Link } from "react-router-dom";

class Nav extends React.Component {
  render() {
    const navStyle = {
      color: "white",
    };
    return (
      <nav>
        <h3>Spotifried</h3>
        <ul className="nav-links">
          <Link style={navStyle} to="/create">
            <li>Create</li>
          </Link>

          <Link style={navStyle} to="/">
            <li>Login</li>
          </Link>

          <Link style={navStyle} to="/top10">
            <li>Top 10</li>
          </Link>
        </ul>
      </nav>
    );
  }
}

export default Nav;
