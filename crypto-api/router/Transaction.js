const { Router } = require("express");
const router = Router();
const controller = require("../controllers/Transaction.js");
const { authenticateJWT } = require("../server.js");

router.post("/create", controller.createTransaction);

router.get("/allTransaction", controller.getAllTransactions);

router.delete("/delete/:id", controller.deleteOne);

router.post("/allSolde", controller.getAllSolde);

module.exports = router;

// router.post("/solde", controller.getAll);
// router.post("/createSolde", controller.solde);
// router.post("/all", controller.getAll);
