const { Router } = require("express");
const router = Router();
const controller = require("../controllers/Login.js");

router.post("/auth", controller.getOneUserAuth);

module.exports = router;
