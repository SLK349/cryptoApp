const { Router } = require("express");
const router = Router();
const controller = require("../controllers/Auth.js");

router.get("/authById/:id", controller.authById);

module.exports = router;
