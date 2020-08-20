const express = require("express");
const pg = require("pg");

const router = express.Router();
router.use(express.json());
module.exports = router;

let env = require("../env.json");
const Pool = pg.Pool;
const pool = new Pool(env);
pool.connect();

const selectUserQuery = "SELECT top10 FROM users WHERE username = $1";

router.get("/search", function (req, res) {
  let username = req.query.username;

  pool.query(selectUserQuery, [username]).then(function (response) {
    if (response.rows.length === 0) {
      return res.status(401).send();
    }
    console.log(response.rows);
    return res.status(200).send({ songs: response.rows });
  });
});
