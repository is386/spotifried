import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import HiddenLink from "./HiddenLink";
import auth from "./Auth";

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: auth.isLoggedIn(),
    };
  }

  render() {
    const navStyle = {
      color: "white",
    };
    return (
      <nav>
        <h3>Spotifried</h3>
        <ul className="nav-links">
          <HiddenLink style={navStyle} to="/top10" render={this.state.loggedIn}>
            <li>My Top 10</li>
          </HiddenLink>

          <Link style={navStyle} to="/search">
            <li>Explore Top Tens</li>
          </Link>

          <HiddenLink style={navStyle} to="/create" render={!this.state.loggedIn}>
            <li>Create an Account</li>
          </HiddenLink>

          <HiddenLink style={navStyle} to="/login" render={!this.state.loggedIn}>
            <li>Login</li>
          </HiddenLink>

          <HiddenLink style={navStyle} to="/logout" render={this.state.loggedIn}>
            <li>(Click to log out)</li>
          </HiddenLink>
        </ul>
      </nav>
    );
  }
}

export default Nav;
