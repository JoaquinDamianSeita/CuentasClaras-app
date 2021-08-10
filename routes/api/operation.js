const router = require("express").Router();

const Operation = require("../../database/models/Operation");
const Category = require("../../database/models/Category");

router.get("/:userId", async (req, res) => {
  const operations = await Operation.findAll({
    where: {userId: req.params.userId},
    attributes: ["monto", "concepto", "tipo"],
    include: {
      model: Category,
      as: "category",
      attributes: ["type"],
    },
  });
  res.json(operations);
});

router.post("/", async (req, res) => {
  const operation = await Operation.create(req.body);
  res.json(operation);
});

router.put("/:operationID", async (req, res) => {
  await Operation.update(req.body, {
    where: { id: req.params.operationID },
  });
  res.json({ success: "Se ha modificado con exito!" });
});

router.delete("/:operationID", async (req, res) => {
  await Operation.destroy({
    where: { id: req.params.operationID },
  });
  res.json({ success: "Se ha borrado con exito!" });
});

module.exports = router;
