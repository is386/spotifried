const express = require("express");
const pg = require("pg");
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
function pushTopTen(songs) {
  pool.query(updateSongsQuery, [songs, "placeholder_username"]).catch(function (error) {
    console.log(error);
    return false;
  });
  return true;
}

// Returns status 401 if the token is invalid.
// Returns status 500 for any other error
// Returns status 200 if all goes well.
router.post("/top_10", function (req, res) {
  if (!req.body.hasOwnProperty("token")) {
    return res.status(401).send();
  }
  let token = req.body.token;
  spotify.setAccessToken(token);
  spotify
    .getMyTopTracks({ limit: songLimit })
    .then((response) => {
      let songs = parseSongs(response.body.items);
      pushTopTen(JSON.stringify(songs));
      return res.status(200).send({ songs: songs });
    })
    .catch((error) => {
      return res.status(500).send();
    });
});

// a post request handler that takes in a top 10 songs object and saves the json to the database
// heres what our top 10 songs object looks like, just make sure to check the fields
// {
// id: 0,
// name: Cool Song,
// album: Cool Album,
// artists: [Cool Dude],
// art: image.png,
// song_url: spotify.com/song,
// album_url: spotify.com/album
// }

// we also need another post request that takes a user name and returns the json top ten object
