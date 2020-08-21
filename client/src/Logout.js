import React from "react";
import "./App.css";
import auth from "./components/Auth";

class Logout extends React.Component {
  // This basically sets the logged in state to false and removes the token.
  render() {
    auth.logout();
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    this.props.history.push("/login");
    return null;
  }
}

export default Logout;
