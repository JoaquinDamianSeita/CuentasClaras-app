const express = require("express");
const apiRouter = require("./routes/index");
const sequelize = require("./database/db");
const Models = require("./database/models/index");
require("./database/associations");
require("dotenv").config();

const PORT = process.env.PORT || 3001;


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", apiRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);

  // Conectase a la base de datos
  // Force true: DROP TABLES
  sequelize
    .sync({ force: false })
    .then(() => {
      console.log("Nos hemos conectado a la base de datos");
    })
    .catch((error) => {
      console.log("Se ha producido un error", error);
    });
});
