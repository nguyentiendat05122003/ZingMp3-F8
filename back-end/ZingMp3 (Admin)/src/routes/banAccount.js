const express = require("express");
const router = express.Router();
const banAccountController = require("../app/controllers/banAccountController");
router.get("/", banAccountController.index);
router.post("/add", banAccountController.add);

module.exports = router;
