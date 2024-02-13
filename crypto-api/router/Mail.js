const { Router } = require("express");
const router = Router();
const controller = require("../controllers/Mail.js");

router.post("/paymentMail", controller.paymentMail);

module.exports = router;
