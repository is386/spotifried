import React from "react";
import { Nav } from "react-bootstrap";

// Same as a link but does not render depending on the given boolean
class HiddenLink extends React.Component {
  render() {
    if (this.props.render) {
      return <Nav.Link {...this.props}></Nav.Link>;
    }
    return null;
  }
}

export default HiddenLink;
