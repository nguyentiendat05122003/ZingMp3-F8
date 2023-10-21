const express = require("express");
const router = express.Router();
const followController = require("../app/controllers/followController");
router.get("/", followController.index);

module.exports = router;
