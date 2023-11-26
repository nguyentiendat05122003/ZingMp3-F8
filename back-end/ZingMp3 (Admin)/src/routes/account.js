const express = require("express");
const router = express.Router();
const accountController = require("../app/controllers/accountController");
router.get("/", accountController.index);
router.delete("/:id/delete", accountController.delete);
router.post("/:id/changePassword", accountController.changePassword);
module.exports = router;
