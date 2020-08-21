import React from "react";
import SongTable from "./components/SongTable";
import "./App.css";
import auth from "./components/Auth";
import NavBar from "./components/NavBar";

class Top10 extends React.Component {
  constructor(props) {
    super(props);

    const params = this.getHashParams();

    this.state = {
      token: params.access_token ? params.access_token : null,
      connected: params.access_token ? true : false,
      loggedIn: false,
      songs: [],
    };

    this.handleGetTopTen = this.handleGetTopTen.bind(this);
  }

  // This checks if the login token exists. If not, it redirects to the login.
  async componentDidMount() {
    await auth.authenticate(localStorage.getItem("token"));
    this.setState({ loggedIn: auth.authenticated });
    if (!this.state.loggedIn) {
      this.props.history.push("/");
    }
  }

  // Hashes the access token
  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  // Gets the top ten songs from our backend
  handleGetTopTen() {
    if (!this.state.connected) {
      this.setState({ error: "Spotify not connected." });
      return;
    }
    let data = { spotify_token: this.state.token, auth_token: localStorage.getItem("token") };
    fetch("/top_10", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            this.setState({ songs: data.songs });
            this.setState({ error: "" });
          });
        } else if (response.status === 401) {
          this.setState({ error: "Invalid Token." });
        } else {
          this.setState({ error: "Something Went Wrong :(" });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // This page should only be accessed by people who are logged in
  render() {
    let spotifyConnect = null;
    if (!this.state.connected) {
      spotifyConnect = <a href="http://localhost:5000/spotify_login">Connect to Spotify</a>;
    }

    return (
      <div>
        <NavBar loggedIn={auth.authenticated} />

        <h1>Your Top 10</h1>
        <div id="error">{this.state.error}</div>
        <br />
        {spotifyConnect}
        <br />
        <button id="send" onClick={this.handleGetTopTen}>
          Get Top 10 Tracks
        </button>
        <br />
        <SongTable songs={this.state.songs}></SongTable>
      </div>
    );
  }
}

export default Top10;
