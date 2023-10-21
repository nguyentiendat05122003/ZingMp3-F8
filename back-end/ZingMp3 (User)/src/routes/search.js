const express = require("express");
const router = express.Router();
const middleWareController = require("../app/controllers/middleWareController");
router.get("/", middleWareController.search);
module.exports = router;
