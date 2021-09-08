const router = require("express").Router();

const Operation = require("../../database/models/Operation");
const Category = require("../../database/models/schemas/Category");

router.get("/:userId", async (req, res) => {
  const operations = await Operation.findAll({
    where: { userId: req.params.userId },
    attributes: ["amount", "concept", "type", "id"],
    include: {
      model: Category,
      as: "category",
      attributes: ["type"],
    },
  });
  res.json(operations);
});

router.get("/balance/:userId", async (req, res) => {
  const operations = await Operation.findAll({
    where: { userId: req.params.userId },
    attributes: ["amount", "type"]
  });
  
  let balance = 0;

  operations.forEach(operation => {
    if (operation.type === "Egreso") {
      balance = balance - parseInt(operation.amount);
    }
    if (operation.type === "Ingreso") {
      balance = balance +  parseInt(operation.amount);
    }
  });

  res.json(balance);
  // res.json(operations)

});

router.get("/:userId/:operationId", async (req, res) => {
  const operation = await Operation.findOne({
    where: { userId: req.params.userId, id: req.params.operationId },
    attributes: ["amount", "concept", "type", "id"],
    include: {
      model: Category,
      as: "category",
      attributes: ["type"],
    },
  });
  res.json(operation);
});

router.post("/", async (req, res) => {
  const operation = await Operation.create(req.body);
  res.json(operation);
});

router.put("/:operationID", async (req, res) => {
  await Operation.update(req.body.data, {
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
