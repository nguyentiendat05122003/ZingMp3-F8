const express = require("express");
const router = express.Router();
const favoriteSongController = require("../app/controllers/favoriteSongController");
router.get("/:userId", favoriteSongController.index);
router.post("/add", favoriteSongController.add);
router.delete("/delete", favoriteSongController.delete);

module.exports = router;
