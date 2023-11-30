const express = require("express");
const router = express.Router();
const typeSongController = require("../app/controllers/typeSongController");
router.get("/", typeSongController.index);
router.post("/add", typeSongController.add);
router.post("/customApi", typeSongController.custom);
router.put("/:id/edit", typeSongController.edit);
router.delete("/:id/delete", typeSongController.delete);

module.exports = router;
