import React from "react";
import Spotify from "spotify-web-api-js";
import SongTable from "./components/SongTable";
import "./App.css";

const spotify = new Spotify();
const songLimit = 10;

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
    this.parseSongs = this.parseSongs.bind(this);
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
    spotify.getMyTopTracks({ limit: songLimit }).then((response) => {
      this.parseSongs(response.items);
    });
  }

  parseSongs(songData) {
    if (songData.length === 0) {
      return "No Songs";
    }
    let songs = [];
    for (let i = 0; i < songData.length; i++) {
      let data = songData[i];
      let artists = [];
      for (let j = 0; j < data.artists.length; j++) {
        artists.push(data.artists[j].name);
      }
      let song = {
        id: i,
        name: data.name,
        album: data.album.name,
        artists: artists,
        art: data.album.images[0].url,
        song_url: data.external_urls.spotify,
        album_url: data.album.external_urls.spotify,
      };
      songs.push(song);
    }
    this.setState({ songs: songs });
  }

  render() {
    let spotifyConnect = null;
    if (!this.state.loggedIn) {
      spotifyConnect = <a href="http://localhost:5000/spotify_login">Connect to Spotify</a>;
    }
    return (
      <div onLoad={this.handleGetTop10}>
        <h1>Your Top 10</h1>
        <div id="error">{this.state.error}</div>
        <br />
        {spotifyConnect}
        <br />
        <button id="send" onClick={this.getTopTen}>
          Get Top 10 Tracks
        </button>
        <br />
        <SongTable songs={this.state.songs}></SongTable>
      </div>
    );
  }
}

export default Top10;
