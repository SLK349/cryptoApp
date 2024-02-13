const { Router } = require("express");
const router = Router();
const controller = require("../controllers/Abonnement.js");

router.post("/createAbo", controller.createAbonnement);

module.exports = router;
