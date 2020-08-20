import React from "react";
import "./App.css";
import auth from "./components/Auth";

class Logout extends React.Component {
  render() {
    auth.logout(() => {
      this.props.history.push("/login");
    });
    return null;
  }
}

export default Logout;
