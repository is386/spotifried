import React from "react";
import "../App.css";
import { Link } from "react-router-dom";

// Same as a link but does not render depending on the given boolean
class HiddenLink extends React.Component {
  render() {
    if (this.props.render) {
      return <Link {...this.props}></Link>;
    }
    return null;
  }
}

export default HiddenLink;
