const express = require("express");
const router = express.Router();
const followController = require("../app/controllers/followController");

router.post("/add", followController.follower);
router.post("/delete", followController.unFollower);
router.get("/status", followController.statusFollow);
router.get("/artist/:userId", followController.getListArtFollow);
router.get("/:artistId", followController.countFollower);

module.exports = router;
