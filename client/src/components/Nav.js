import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import HiddenLink from "./HiddenLink";

class Nav extends React.Component {
  render() {
    const navStyle = {
      color: "white",
    };
    return (
      <nav>
        <h3>Spotifried</h3>
        <ul className="nav-links">
          <HiddenLink style={navStyle} to="/top10" render={this.props.loggedIn}>
            <li>My Top 10</li>
          </HiddenLink>

          <Link style={navStyle} to="/search">
            <li>Explore Top Tens</li>
          </Link>

          <HiddenLink style={navStyle} to="/create" render={!this.props.loggedIn}>
            <li>Create an Account</li>
          </HiddenLink>

          <HiddenLink style={navStyle} to="/" render={!this.props.loggedIn}>
            <li>Login</li>
          </HiddenLink>

          <HiddenLink style={navStyle} to="/logout" render={this.props.loggedIn}>
            <li>(Click to log out)</li>
          </HiddenLink>
        </ul>
      </nav>
    );
  }
}

export default Nav;
