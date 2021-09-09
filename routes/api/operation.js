const router = require("express").Router();

const Operation = require("../../database/models/schemas/Operation");
const Category = require("../../database/models/schemas/Category");

const {
  controllerOperationCR,
  controllerOperationRA,
  controllerOperationRO,
  controllerOperationU,
  controllerOperationD,
} = require("../../database/controller/operation");



router
  .get("/:userId", controllerOperationRA)
  .get("/:userId/:operationId", controllerOperationRO)
  .post("/", controllerOperationCR)
  .put("/:operationID", controllerOperationU)
  .delete("/:operationId", controllerOperationD);

router.get("/balance/:userId", async (req, res) => {
  const operations = await Operation.findAll({
    where: { userId: req.params.userId },
    attributes: ["amount", "type"],
  });

  let balance = 0;

  operations.forEach((operation) => {
    if (operation.type === "Egreso") {
      balance = balance - parseInt(operation.amount);
    }
    if (operation.type === "Ingreso") {
      balance = balance + parseInt(operation.amount);
    }
  });

  res.json(balance);
  // res.json(operations)
});

module.exports = router;
