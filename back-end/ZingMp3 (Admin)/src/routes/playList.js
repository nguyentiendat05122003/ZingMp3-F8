const express = require("express");
const router = express.Router();
const playListController = require("../app/controllers/playListController");
router.get("/", playListController.index);
router.post("/add", playListController.add);
router.put("/:id/edit", playListController.edit);
router.delete("/:id/delete", playListController.delete);
module.exports = router;
