import React from "react";
import SongTable from "./components/SongTable";
import auth from "./components/Auth";
import Nav from "./components/Nav";
import "./App.css";

class Top10 extends React.Component {
  constructor(props) {
    super(props);

    const params = this.getHashParams();

    this.state = {
      token: params.access_token ? params.access_token : null,
      loggedIn: params.access_token ? true : false,
      songs: [],
    };

    this.handleGetTopTen = this.handleGetTopTen.bind(this);
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
    if (!this.state.loggedIn) {
      this.setState({ error: "Spotify not connected." });
      return;
    }
    let data = { token: this.state.token };
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

  render() {
    if (!auth.isLoggedIn()) {
      this.props.history.push("/login");
    }
    let spotifyConnect = null;
    if (!this.state.loggedIn) {
      spotifyConnect = <a href="http://localhost:5000/spotify_login">Connect to Spotify</a>;
    }
    return (
      <div>
        <Nav />
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
