const express = require("express");
const router = express.Router();
const playListSongController = require("../app/controllers/playListSongController");
router.get("/:id", playListSongController.index);
router.post("/add", playListSongController.add);
//router.put("/:id/edit", playListController.edit);
router.delete("/:id/delete", playListSongController.delete);
// router.post("/add", authController.addUser);
module.exports = router;
