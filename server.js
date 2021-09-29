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

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.use(function (err, req, res, next) {
  console.log(err);
  res.status(500).send(err.message);
});

module.exports = { app };
