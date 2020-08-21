const express = require("express");
const pg = require("pg");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
router.use(express.json());

module.exports = router;

const saltRounds = 10;
const userMin = 1;
const userMax = 20;
const passMin = 5;
const passMax = 36;

const selectUserQuery = "SELECT hashed_password FROM users WHERE username = $1";
const insertUserQuery = "INSERT INTO users (username, hashed_password) VALUES ($1, $2)";

const env = require("../env.json");
const Pool = pg.Pool;
const pool = new Pool(env);
pool.connect();

// Returns true if the request body for a user is valid, false otherwise.
function validUserBody(body) {
  if (
    body.hasOwnProperty("username") &&
    body.hasOwnProperty("password") &&
    typeof body.username == "string" &&
    typeof body.password == "string" &&
    body.username.length >= userMin &&
    body.username.length <= userMax &&
    body.password.length >= passMin &&
    body.password.length <= passMax
  ) {
    return true;
  }
  return false;
}

// Inserts the username and hashed password into the users table.
// Returns true if successful, false otherwise.
function insertUser(user, pass) {
  pool.query(insertUserQuery, [user, pass]).catch(function (error) {
    console.log(error);
    return false;
  });
  return true;
}

// Returns status 401 if the username or password is invalid.
// Returns status 500 if there is any other error.
// Returns status 200 if the username and password were entered successfully.
router.post("/user", function (req, res) {
  if (!validUserBody(req.body)) {
    return res.status(401).send(); // invalid user or password
  }

  let username = req.body.username;
  let password = req.body.password;

  pool.query(selectUserQuery, [username]).then(function (response) {
    if (response.rows.length !== 0) {
      return res.status(401).send(); // user already exists
    }
    bcrypt
      .hash(password, saltRounds)
      .then(function (hashedPassword) {
        let success = insertUser(username, hashedPassword);
        if (success) {
          res.status(200).send(); // user was inserted
        } else {
          res.status(500).send(); // user was not inserted
        }
      })
      .catch(function (error) {
        console.log(error);
        res.status(500).send();
      });
  });
});

// Returns status 401 if the username or password is invalid.
// Returns status 500 if there is any other error.
// Returns status 200 if the user is authenticated.
router.post("/auth", function (req, res) {
  let username = req.body.username;
  let password = req.body.password;
  let accessToken = jwt.sign(username, env.access_token_secret);

  pool
    .query(selectUserQuery, [username])
    .then(function (response) {
      if (response.rows.length === 0) {
        return res.status(401).send(); // user does not exist
      }
      let hashedPassword = response.rows[0].hashed_password;
      bcrypt
        .compare(password, hashedPassword)
        .then(function (isSame) {
          if (isSame) {
            res.status(200).send({ token: accessToken });
          } else {
            res.status(401).send(); // password does not match
          }
        })
        .catch(function (error) {
          console.log(error);
          res.status(500).send();
        });
    })
    .catch(function (error) {
      console.log(error);
      res.status(500).send();
    });
});

// Returns status 401 if the token is null or user doesn't exist
// Returns status 403 if the token is invalid.
// Returns status 200 if the user is authenticated.
router.get("/authToken", (req, res) => {
  let authHeader = req.headers["authorization"];
  let token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    res.status(401).send();
  }

  jwt.verify(token, env.access_token_secret, (err, username) => {
    if (err) {
      res.status(403).send();
    }
    pool.query(selectUserQuery, [username]).then(function (response) {
      if (response.rows.length === 0) {
        return res.status(401).send(); // user does not exist
      } else {
        return res.status(200).send();
      }
    });
  });
});
