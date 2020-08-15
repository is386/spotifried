import React from "react";
import Spotify from "spotify-web-api-js";
import "./App.css";

const spotify = new Spotify();

class Top10 extends React.Component {
  constructor(props) {
    super(props);

    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotify.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      songs: [],
    };

    this.getHashParams = this.getHashParams.bind(this);
    this.getTopTen = this.getTopTen.bind(this);
  }

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

  getTopTen() {
    if (!this.state.loggedIn) {
      this.setState({ error: "Spotify not connected." });
      return;
    }
    let songs = [];
    spotify.getMyTopTracks({ limit: 50 }).then((response) => {
      if (response.items.length === 0) {
        songs.push("No Songs");
      }
      for (let i = 0; i < response.items.length; i++) {
        songs.push(response.items[i].name + "\n,");
      }
      this.setState({ songs: songs });
    });
  }

  render() {
    let spotifyConnect = null;
    if (!this.state.loggedIn) {
      spotifyConnect = <a href="http://localhost:5000/spotify_login">Connect to Spotify</a>;
    }
    return (
      <div onLoad={this.handleGetTop10}>
        <h1>Top 10</h1>
        <div id="error">{this.state.error}</div>
        <br />
        {spotifyConnect}
        <br />
        <button id="send" onClick={this.getTopTen}>
          Get Top tracks
        </button>
        <div id="songs">{this.state.songs}</div>
      </div>
    );
  }
}

export default Top10;
