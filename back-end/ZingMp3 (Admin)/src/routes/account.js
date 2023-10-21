const express = require("express");
const router = express.Router();
const accountController = require("../app/controllers/accountController");
router.get("/", accountController.index);
router.delete("/:id/delete", accountController.delete);
module.exports = router;
