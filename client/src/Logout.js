import React from "react";
import "./App.css";
import auth from "./components/Auth";

class Logout extends React.Component {
  // This basically sets the logged in state to false and removes the token.
  render() {
    auth.logout();
    localStorage.removeItem("token");
    this.props.history.push("/");
    return null;
  }
}

export default Logout;
