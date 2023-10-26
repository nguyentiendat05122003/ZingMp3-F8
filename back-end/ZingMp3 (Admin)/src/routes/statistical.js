const express = require("express");
const router = express.Router();
const statisticalController = require("../app/controllers/statisticalController");
router.get("/", statisticalController.index);
module.exports = router;
