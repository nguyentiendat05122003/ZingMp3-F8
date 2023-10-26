const express = require("express");
const router = express.Router();
const songController = require("../app/controllers/songController");
router.get("/", songController.search);
module.exports = router;
