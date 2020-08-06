import React from "react";
import "./App.css";

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    if (target.name === "username") {
      this.setState({ username: event.target.value });
    } else if (target.name === "password") {
      this.setState({ password: event.target.value });
    }
  }

  handleSubmit(event) {
    alert(JSON.stringify(this.state));
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h1>Create Account</h1>
        <div className="error-div"></div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Username:
            <input
              name="username"
              type="text"
              value={this.state.username}
              onChange={this.handleInputChange}
            ></input>
          </label>
          <br />
          <label>
            Password:{" "}
            <input
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleInputChange}
            ></input>
          </label>
          <br />
          <input type="submit" value="Submit"></input>
        </form>
      </div>
    );
  }
}

export default Create;
