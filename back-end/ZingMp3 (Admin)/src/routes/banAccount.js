const express = require("express");
const router = express.Router();
const banAccountController = require("../app/controllers/banAccountController");
router.get("/", banAccountController.index);

module.exports = router;
