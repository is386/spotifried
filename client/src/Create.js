import React from "react";
import "./App.css";
import auth from "./components/Auth";
import NavBar from "./components/NavBar";
import { FormControl, FormGroup, FormLabel, Form, Button } from "react-bootstrap";
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
      <FormGroup style={{backgroundColor: "#343a40", height: "100vh", margin: "0 auto", position: "relative"}}>
        <NavBar loggedIn={auth.authenticated} />
        
        {/* This div will contain whatever the error variable contains */}
        <div className="error-div">
          <p>{this.state.error}</p>
        </div>
        <FormGroup style = {{ backgroundColor: "#6c757d", border: "solid", borderRadius: "15px", borderColor: "#42a9cf", position: "absolute",top: "25%", bottom: "25%", left: "15%", right: "15%", width: "60%", margin: "0 auto"}}>
        
        
        <div style = {{width: "50%", height: "100%", float: "left"}}>
          <div style = {{width: "50%",height: "60%", position: "absolute", top: "25%", bottom: "25%", display: "inlineBlock"}}>
            <img
                alt=""
                src="favicon.ico"
                className="d-inline-block align-top"
                style = {{transform: "translate(-8%, -10%) rotate(175deg)", display: "block", top: "25%"}}
                >
            </img>{" "}
            <h1>Spotifried</h1>
          </div>
          
        </div>
        <div style = {{width: "50%",height: "100%", display: "grid", float: "right",margin: "0 auto"}}>
        <form onSubmit={this.handleSubmit} style = {{height: "100%", position: "relative"}}>
          <h1>Create Account</h1>
          
          <FormLabel>
            {/* The value of the username field will change as its being typed into*/}
            <FormControl
              name="username"
              type="text"
              value={this.state.username}
              placeholder = "Username"
              onChange={this.handleInputChange}
              data-tip data-for="usernameTip"
            ></FormControl>
            <ReactTooltip id="usernameTip" place="bottom" effect="solid">
            Usernames must be between 1 and 20 characters long.
            </ReactTooltip>
          </FormLabel>
          <br />
          <FormLabel>
            {/* The value of the input field will change as its being typed into*/}
            <FormControl name="password" type="password" placeholder = "Password" onChange={this.handleInputChange} data-tip data-for="passwordTip"></FormControl>
            <ReactTooltip id="passwordTip" place="bottom" effect="solid">
            Passwords must be between 5 and 36 characters long.
            </ReactTooltip>
          </FormLabel>
          <br />
          <Button type="submit" value="Submit" >Submit</Button>
          
        </form>
        </div>
        </FormGroup>
      </FormGroup>
    );
  }
}

export default Create;
