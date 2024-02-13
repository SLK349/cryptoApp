const { Router } = require("express");
const router = Router();
const controller = require("../controllers/Trade.js");
const auth = require("../server.js");

router.post("/create", controller.createTrade);

router.post("/getAll", controller.getAllTrade);

router.delete("/delete/:id", controller.deleteOne);

router.put("/update/:id", controller.updateOne);

module.exports = router;
