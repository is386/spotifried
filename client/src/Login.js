import React from "react";
import "./App.css";
import auth from "./components/Auth";
import NavBar from "./components/NavBar";
import { FormControl, FormGroup, FormLabel, Button } from "react-bootstrap";

class Login extends React.Component {
  constructor(props) {
    super(props);

    // This will be updated by the input fields and submit button.
    this.state = { username: "", password: "", error: "", loggedIn: false };

    // Binds the methods to this object.
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // This checks if the login token exists. If so, it redirects to the top 10 page.
  async componentDidMount() {
    await auth.authenticate(localStorage.getItem("token"));
    this.setState({ loggedIn: auth.authenticated });
    if (this.state.loggedIn) {
      this.props.history.push("/top10");
    }
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
          response.json().then((data) => {
            localStorage.setItem("token", data.token);
            localStorage.setItem("name", this.state.username);
            auth.login();
            this.props.history.push("/top10");
          });
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
        <NavBar loggedIn={auth.authenticated} />
        <div className="outer-container">
          <FormGroup className="form-container">
            {/* This div will contain whatever the error variable contains */}
            <div>
              <form onSubmit={this.handleSubmit}>
                <img alt="" src="spotifried.png" className="logo-top"></img>
                <h1>User Login</h1>
                <FormLabel>
                  {/* The value of the username field will change as its being typed into*/}
                  <FormControl
                    name="username"
                    type="text"
                    value={this.state.username}
                    placeholder="Username"
                    onChange={this.handleInputChange}
                  ></FormControl>
                </FormLabel>
                <br />
                <FormLabel>
                  {/* The value of the input field will change as its being typed into*/}
                  <FormControl
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={this.handleInputChange}
                  ></FormControl>
                </FormLabel>
                <br />
                <Button type="submit" value="Login" variant="secondary">
                  Login
                </Button>
                <div className="error-div">
                  <p>{this.state.error}</p>
                </div>
                <a href="/create">Don't have an account? Click here to create one.</a>
              </form>
            </div>
          </FormGroup>
        </div>
      </div>
    );
  }
}

export default Login;
