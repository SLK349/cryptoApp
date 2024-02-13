const { Router } = require("express");
const router = Router();
const controller = require("../controllers/Register.js");

router.post("/create", controller.createUser);

module.exports = router;
