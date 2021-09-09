const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");


const  User  = require("../../database/models/schemas/User");
const  Operation  = require("../../database/models/schemas/Operation");
const  Category  = require("../../database/models/schemas/Category");


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
          attributes: ["type"]
        }
      }
    });
    res.json(data);
});


router.post(
  "/register",
  [
    check("username", "El nombre de usuario es obligatorio").not().isEmpty(),
    check("password", "El password es obligatorio").not().isEmpty(),
    check("email", "El email debe ser correcto").isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errores: errors.array() });
    }

    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const user = await User.create(req.body);
    res.send(user);
  }
);

router.post("/login", async (req, res) => {
  const user = await User.findOne({ where: { email: req.body.email } });
  if (user) {
    const iguales = bcrypt.compareSync(req.body.password, user.password);
    if (iguales) {
      res.json({ success: createToken(user) });
    } else {
      res.json({ error: "Error en usuario y/o contraseña" });
    }
  } else {
    res.json({ error: "Error en usuario y/o contraseña" });
  }
});

const createToken = (user) => {
  const payload = {
    usuarioId: user.usuarioId,
    createdAt: moment().unix(),
    expiredAt: moment().add(5, "minutes").unix(),
  };
  return jwt.encode(payload, process.env.SECRET_JWT);
};

module.exports = router;
