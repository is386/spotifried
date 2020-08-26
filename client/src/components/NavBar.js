import React from "react";
import HiddenLink from "./HiddenLink";
import { Navbar, Nav, Button } from "react-bootstrap";

class NavBar extends React.Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">
          <img
            alt=""
            src="favicon.ico"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          Spotifried
        </Navbar.Brand>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/search">Explore Top Tens</Nav.Link>
            <HiddenLink href="/top10" render={this.props.loggedIn}>
              Your Top Ten
            </HiddenLink>
          </Nav>
          <Nav>
            <Nav.Item style={{ color: "white", padding: "12px" }}>
              {localStorage.getItem("name")}
            </Nav.Item>
            <HiddenLink href="/create" render={!this.props.loggedIn}>
              <Button variant="primary">Create Account</Button>
            </HiddenLink>
            <HiddenLink href="/login" render={!this.props.loggedIn}>
              <Button variant="success">Login</Button>
            </HiddenLink>
            <HiddenLink href="/logout" render={this.props.loggedIn}>
              <Button variant="danger">Logout</Button>
            </HiddenLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
