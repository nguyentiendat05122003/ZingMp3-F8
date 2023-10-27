const express = require("express");
const router = express.Router();
const followController = require("../app/controllers/followController");

router.post("/add", followController.follower);
router.post("/delete", followController.unFollower);
router.get("/:artistId", followController.countFollower);
router.get("/", followController.index);

module.exports = router;
