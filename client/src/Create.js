import React from "react";
import "./App.css";
import auth from "./components/Auth";
import NavBar from "./components/NavBar";
import { FormControl, FormGroup, FormLabel, Button } from "react-bootstrap";
import ReactTooltip from "react-tooltip";

class Create extends React.Component {
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

  // Sends a POST request to make an account. Sets the error state to a message depending on the status code.
  handleSubmit(event) {
    event.preventDefault();
    let data = { username: this.state.username, password: this.state.password };
    fetch("/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 200) {
          this.setState({ error: "Account Created Successfully!" });
          this.props.history.push("/login");
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
          {/* This div will contain whatever the error variable contains */}
          <FormGroup className="form-container">
            <div>
              <form onSubmit={this.handleSubmit}>
                <img alt="" src="spotifried.png" className="logo-top"></img>
                <h1>Create Account</h1>
                <FormLabel>
                  {/* The value of the username field will change as its being typed into*/}
                  <FormControl
                    name="username"
                    type="text"
                    value={this.state.username}
                    placeholder="Username"
                    onChange={this.handleInputChange}
                    data-tip
                    data-for="usernameTip"
                  ></FormControl>
                  <ReactTooltip id="usernameTip" place="bottom" effect="solid">
                    Usernames must be between 1 and 20 characters long.
                  </ReactTooltip>
                </FormLabel>
                <br />
                <FormLabel>
                  {/* The value of the input field will change as its being typed into*/}
                  <FormControl
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={this.handleInputChange}
                    data-tip
                    data-for="passwordTip"
                  ></FormControl>
                  <ReactTooltip id="passwordTip" place="bottom" effect="solid">
                    Passwords must be between 5 and 36 characters long.
                  </ReactTooltip>
                </FormLabel>
                <br />
                <Button variant="secondary" type="submit" value="Submit">
                  Create
                </Button>
                <div className="error-div">
                <div class="alert alert-warning error-msg">{this.state.error}</div>
                </div>
                <a href="/login">Already have an account? Click here to log in.</a>
              </form>
            </div>
          </FormGroup>
        </div>
      </div>
    );
  }
}

export default Create;
