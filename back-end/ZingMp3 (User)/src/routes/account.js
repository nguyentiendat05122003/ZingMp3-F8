const express = require("express");
const router = express.Router();
const accountController = require("../app/controllers/accountController");
const middleWareController = require("../app/controllers/middleWareController");
router.get("/", accountController.index);
router.delete("/:id/delete", accountController.delete);
module.exports = router;
