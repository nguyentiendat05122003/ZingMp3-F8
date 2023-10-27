const express = require("express");
const router = express.Router();
const statisticalController = require("../app/controllers/statisticalController");
router.get("/", statisticalController.index);
router.get("/detail", statisticalController.detail);
module.exports = router;
