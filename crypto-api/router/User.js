const {Router} = require("express");
const router = Router();
const controller = require("../controllers/User");

router.post("/username", controller.getUsername);

router.get("/getUser", controller.getUser);

router.get("/isSubscriber", controller.isSubscriber);

module.exports = router;
