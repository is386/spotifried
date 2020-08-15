const express = require("express");
const app = express();
app.use(express.json());

const port = 5000;
const hostname = "localhost";

const userRouter = require("./routes/user.js");
app.use(userRouter);

const spotifyRouter = require("./routes/spotify.js");
app.use(spotifyRouter);

const top10Router = require("./routes/top10.js");
app.use(top10Router);

app.listen(port, hostname, () => {
  console.log(`Listening at: http://${hostname}:${port}`);
});
