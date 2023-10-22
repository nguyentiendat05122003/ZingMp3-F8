const express = require("express");
const router = express.Router();
const banAccountController = require("../app/controllers/banAccountController");
router.get("/", banAccountController.index);
router.post("/add/:id", banAccountController.banAccount);
router.post("/delete/:id", banAccountController.unBanAccount);

module.exports = router;
