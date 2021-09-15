const router = require("express").Router();

const UserController = require("../../database/controller/user");

const User = require("../../database/models/schemas/User");
const Operation = require("../../database/models/schemas/Operation");
const Category = require("../../database/models/schemas/Category");

const moment = require("moment");
const jwt = require("jwt-simple");

router.get("/listUsers", async (req, res) => {
  const data = await User.findAll({
    attributes: ["username", "email"],
    excludes: ["password", "id"],
    include: {
      model: Operation,
      as: "operations",
      attributes: ["tipo", "concepto", "monto"],
      include: {
        model: Category,
        as: "category",
        attributes: ["type"],
      },
    },
  });
  res.json(data);
});

router.post("/register", UserController.userRegister);

router.post("/login", UserController.userLogin);



module.exports = router;
