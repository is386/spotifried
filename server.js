const express = require("express");
const app = express();
app.use(express.json());

const port = 5000;
const hostname = "localhost";

const userRouter = require("./routes/user.js");
app.use(userRouter);

app.listen(port, hostname, () => {
  console.log(`Listening at: http://${hostname}:${port}`);
});
