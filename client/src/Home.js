import React from "react";
import "./App.css";
import auth from "./components/Auth";
import NavBar from "./components/NavBar";
import { Jumbotron, Button, Card, CardDeck } from "react-bootstrap";

class Create extends React.Component {
  async componentDidMount() {
    await auth.authenticate(localStorage.getItem("token"));
    this.setState({ loggedIn: auth.authenticated });
    if (!this.state.loggedIn) {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <div>
        <NavBar loggedIn={auth.authenticated} />
        <Jumbotron bg="dark" text="dark" className="mb-2">
          <h1>Welcome to Spotifried!</h1>
          <p>This is a simple website that shows you your top ten songs on Spotify.</p>
          <div className="btn-container">
            <Button href="/create" target="_blank" rel="noopener noreferrer" variant="secondary">
              Create Account
            </Button>
          </div>
          <div className="btn-container">
            <Button variant="primary" href="https://github.com/is386/spotifried">
              GitHub Repository
            </Button>
          </div>
          <a href="/login">Already have an account? Click here to log in.</a>
        </Jumbotron>

        <CardDeck>
          <Card bg="secondary" text="dark">
            <Card.Img variant="top" src="gray-spotify.png" />
            <Card.Body>
              <Card.Title>Music From Spotify</Card.Title>
              <Card.Text>All the music on this website is sourced from Spotify.</Card.Text>
            </Card.Body>
          </Card>
          <Card bg="secondary" text="dark" className="mb-2">
            <Card.Img variant="top" src="top10.png" />
            <Card.Body>
              <Card.Title>Get Your Top Ten Tracks</Card.Title>
              <Card.Text>
                After connecting your Spotify account, we deliver your top ten tracks on Spotify.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card bg="secondary" text="dark" className="mb-2">
            <Card.Img variant="top" src="explore.png" />
            <Card.Body>
              <Card.Title>Explore Others' Tracks</Card.Title>
              <Card.Text>
                You can explore the top ten tracks of other users on this website, even your
                friends!
              </Card.Text>
            </Card.Body>
          </Card>
        </CardDeck>
      </div>
    );
  }
}

export default Create;
