const express = require("express");
const router = express.Router();
const accountController = require("../app/controllers/accountController");
const middleWareController = require("../app/controllers/middleWareController");
router.get(
  "/:id",
  middleWareController.verifyTokenAndSelfAuth,
  accountController.index
);
module.exports = router;
