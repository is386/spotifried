import React from "react";
import "./App.css";

class Login extends React.Component {
  constructor(props) {
    super(props);

    // This will be updated by the input fields and submit button.
    this.state = { username: "", password: "", error: "" };

    // Binds the methods to this object.
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Updates the username and password variables
  handleInputChange(event) {
    const target = event.target;
    if (target.name === "username") {
      this.setState({ username: event.target.value });
    } else if (target.name === "password") {
      this.setState({ password: event.target.value });
    }
  }

  // Sends a POST request to log into an account. Sets the error state to a message depending on the status code.
  handleSubmit(event) {
    event.preventDefault();
    let data = { username: this.state.username, password: this.state.password };
    fetch("/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 200) {
          this.setState({ error: "Successfully Logged In!" });
        } else if (response.status === 401) {
          this.setState({ error: "Invalid Username or Password." });
        } else {
          this.setState({ error: "Something Went Wrong :(" });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        {/* This div will contain whatever the error variable contains */}
        <div className="error-div">
          <p>{this.state.error}</p>
        </div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Username:
            {/* The value of the username field will change as its being typed into*/}
            <input
              name="username"
              type="text"
              value={this.state.username}
              onChange={this.handleInputChange}
            ></input>
          </label>
          <br />
          <label>
            Password:
            {/* The value of the input field will change as its being typed into*/}
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

export default Login;
