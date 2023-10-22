const express = require("express");
const router = express.Router();
const banAccountController = require("../app/controllers/banAccountController");
router.get("/", banAccountController.index);
router.post("/add", banAccountController.banAccount);
router.post("/delete", banAccountController.unBanAccount);

module.exports = router;
