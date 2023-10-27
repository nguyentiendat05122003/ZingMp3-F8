const express = require("express");
const router = express.Router();
const typeSongController = require("../app/controllers/typeSongController");
router.get("/", typeSongController.index);

module.exports = router;
