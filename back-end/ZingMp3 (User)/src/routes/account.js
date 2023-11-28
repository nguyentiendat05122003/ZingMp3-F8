const express = require("express");
const router = express.Router();
const accountController = require("../app/controllers/accountController");
router.post("/changePassword/:id", accountController.changePassword);
router.get("/:id", accountController.index);

module.exports = router;
