import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import HiddenLink from "./HiddenLink";

class NavBar extends React.Component {
  render() {
    return (
      <nav>
        <h3>Spotifried</h3>
        <ul className="nav-links">
          <HiddenLink to="/top10" render={this.props.loggedIn}>
            <li>My Top 10</li>
          </HiddenLink>

          <Link to="/search">
            <li>Explore Top Tens</li>
          </Link>

          <HiddenLink to="/create" render={!this.props.loggedIn}>
            <li>Create an Account</li>
          </HiddenLink>

          <HiddenLink to="/" render={!this.props.loggedIn}>
            <li>Login</li>
          </HiddenLink>

          <HiddenLink to="/logout" render={this.props.loggedIn}>
            <li>(Click to log out)</li>
          </HiddenLink>
        </ul>
      </nav>
    );
  }
}

export default NavBar;
