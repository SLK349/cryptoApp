const { Router } = require("express");
const router = Router();
const controller = require("../controllers/Publication.js");

router.post("/createPub", controller.createPub);

router.get("/allPub", controller.getAllPub);

router.get("/getUsername", controller.getUsername);

router.post("/like/:publicationId", controller.like);

// router.get("/countLike", controller.countLike);

// router.get("/checkUserLike", controller.checkUserLike);

router.delete("/deletePub/:publicationId", controller.deletePub);

module.exports = router;
