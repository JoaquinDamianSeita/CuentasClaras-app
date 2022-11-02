const express = require("express");
const path = require("path");
const cors = require("cors");
const apiRouter = require("./routes/index");
const { CLIENTORIGIN } = require("./config/globals");

const app = express();

app.use(cors({ origin: CLIENTORIGIN }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "client", "build")));

app.use("/api", apiRouter);

app.get('*', function (req, res) {
  const index = path.join(__dirname, 'client', 'public', 'index.html');
  res.sendFile(index);
});

app.use(function (err, req, res, next) {
  console.log(err);
  res.status(500).send(err.message);
});

module.exports = { app };
