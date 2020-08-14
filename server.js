const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json());

const port = 5000;
const hostname = "localhost";

app.use(express.static("public_html")).use(cors()).use(cookieParser());

const userRouter = require("./routes/user.js");
app.use(userRouter);

const top10Router = require("./routes/spotify.js");
app.use(top10Router);

app.listen(port, hostname, () => {
  console.log(`Listening at: http://${hostname}:${port}`);
});
