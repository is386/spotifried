//Used https://developer.spotify.com/documentation/web-api/quick-start/ as a guide in setting this up
let express = require("express");
let request = require("request");
let querystring = require("querystring");

let env = require("../env.json");
let client_id = env.client_id;
let client_secret = env.client_secret;
let redirect_uri = env.redirect_uri;
let bearer = "";

let stateKey = "spotify_auth_state";

const router = express.Router();
router.use(express.json());
module.exports = router;

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
let generateRandomString = function (length) {
  let text = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

router.get("/login", function (req, res) {
  let state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  let scope = "user-read-private user-top-read";
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
      })
  );
});

router.get("/callback", function (req, res) {
  // your application requests refresh and access tokens
  // after checking the state parameter

  let code = req.query.code || null;
  let state = req.query.state || null;
  let storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect(
      "/" +
        querystring.stringify({
          error: "state_mismatch",
        })
    );
  } else {
    res.clearCookie(stateKey);
    let authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code",
      },
      headers: {
        Authorization: "Basic " + new Buffer(client_id + ":" + client_secret).toString("base64"),
      },
      json: true,
    };
    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        bearer = "Bearer " + body.access_token;
      }
    });
    res.redirect("http://localhost:5000/top10.html");
  }
});

// Returns status 401 if the user is not logged into spotify
// Returns status 200 if the user is logged into spotify and it sends the top 10.
router.get("/top_10", function (req, res) {
  function callback(error, response, body) {
    // if logged in, 200, else 401
    if (!error && response.statusCode == 200) {
      res.status(response.statusCode).send({ body: body });
    } else {
      res.status(response.statusCode).send();
    }
  }

  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: bearer,
  };

  let options = {
    url: "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10&offset=0",
    headers: headers,
  };

  request(options, callback);
});
