const express = require("express");
const router = express.Router();
const playListSongController = require("../app/controllers/playListSongController");
router.get("/:id", playListSongController.index);
router.post("/add", playListSongController.add);
router.delete("/:id/delete/:songId", playListSongController.delete);
module.exports = router;
