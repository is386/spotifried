import React from "react";
import SongTable from "./components/SongTable";
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
      range: "long_term",
    };

    this.handleGetTopTen = this.handleGetTopTen.bind(this);
    this.handleRangeChange = this.handleRangeChange.bind(this);
  }

  // This checks if the login token exists. If not, it redirects to the login.
  async componentDidMount() {
    await auth.authenticate(localStorage.getItem("token"));
    this.setState({ loggedIn: auth.authenticated });
    if (!this.state.loggedIn) {
      this.props.history.push("/login");
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
    let data = {
      spotify_token: this.state.token,
      auth_token: localStorage.getItem("token"),
      range: this.state.range,
    };
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

  handleRangeChange(event) {
    this.setState({ range: event.target.value });
  }

  // This page should only be accessed by people who are logged in
  render() {
    let spotifyConnect = null;
    if (!this.state.connected) {
      spotifyConnect = (
        <form action="http://localhost:5000/spotify_login">
          <input
            class="btn btn-primary top10"
            style={{ margin: "10px", display: "inline-block" }}
            type="submit"
            value="Connect to Spotify"
          />
        </form>
      );
    }

    return (
      <div>
        <NavBar loggedIn={auth.authenticated} />

        <div id="options">
          <div style={{ padding: "30px" }}>
            <h1>Your Top 10</h1>
          </div>
          {spotifyConnect}
          <div
            id="error"
            class="alert alert-warning error-msg top10"
            style={{ margin: "0px" }}
          >
            {this.state.error}
          </div>
          <div style={{ margin: "20px" }}>
            <div
              id="dateRange"
              class="justify-content-center"
              style={{
                "max-width": "50%",
                margin: "auto",
                display: "inline-block",
                padding: "10px",
              }}
            >
              <label for="range">Choose a date range: </label>
              <select
                name="range"
                class="form-control top10"
                onChange={this.handleRangeChange}
              >
                <option value="long_term">last several years</option>
                <option value="medium_term">last 6 months</option>
                <option value="short_term">last 4 weeks</option>
              </select>
            </div>
            <div>
              <button
                id="send"
                onClick={this.handleGetTopTen}
                class="btn btn-secondary top10"
                style={{ margin: "0px" }}
              >
                Get Top 10 Tracks
              </button>
            </div>
          </div>
        </div>
        <SongTable songs={this.state.songs}></SongTable>
      </div>
    );
  }
}

export default Top10;
