const express = require("express");
const pg = require("pg");
const jwt = require("jsonwebtoken");
const spotifyApi = require("spotify-web-api-node");
const spotify = new spotifyApi();

const router = express.Router();
router.use(express.json());
module.exports = router;

const env = require("../env.json");
const Pool = pg.Pool;
const pool = new Pool(env);
pool.connect();

const songLimit = 10;
const updateSongsQuery = "UPDATE users SET top10 = $1 WHERE username = $2"; // how to get username?

// Parses the songs from spotify's top track response
function parseSongs(songData) {
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
  return songs;
}

// Updates current user data with current top ten songs
// Returns true if successful, false otherwise
function pushTopTen(songs, username) {
  pool.query(updateSongsQuery, [songs, username]).catch(function (error) {
    console.log(error);
    return false;
  });
  return true;
}

// Parses the username from the JWT token
function parseUser(token) {
  let name;
  jwt.verify(token, env.access_token_secret, (err, username) => {
    if (!err) {
      name = username;
    }
  });
  return name;
}

// Returns status 401 if the token is invalid or bad request body.
// Returns status 500 for any other error.
// Returns status 200 if all goes well.
router.post("/top_10", function (req, res) {
  if (!req.body.hasOwnProperty("spotify_token") || !req.body.hasOwnProperty("auth_token")) {
    return res.status(401).send();
  }

  let spotify_token = req.body.spotify_token;
  let auth_token = req.body.auth_token;
  let username = parseUser(auth_token);
  let range = req.body.range;

  if (!username) {
    return res.status(401).send();
  }

  spotify.setAccessToken(spotify_token);
  spotify
    .getMyTopTracks({ limit: songLimit, time_range: range })
    .then((response) => {
      let songs = parseSongs(response.body.items);
      pushTopTen(JSON.stringify(songs), username);
      return res.status(200).send({ songs: songs });
    })
    .catch((error) => {
      return res.status(500).send();
    });
});

// pool
// .query(selectSongsQuery, ["Indervir15"])
// .then(function (response) {
//   console.log(response.rows[0]);
// })
// .catch(function (error) {
//   console.log(error);
// });
