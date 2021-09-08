const router = require("express").Router();

// const middlewares = require("../middlewares");
const apiOperationRouter = require("./api/operation");
const apiUserRouter = require("./api/user");

router.use("/operations",apiOperationRouter); //apply middleware jwt 
router.use("/users", apiUserRouter);


module.exports = router;