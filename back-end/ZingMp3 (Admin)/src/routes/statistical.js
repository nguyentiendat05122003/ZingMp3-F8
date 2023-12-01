const express = require("express");
const router = express.Router();
const statisticalController = require("../app/controllers/statisticalController");
router.get("/", statisticalController.index);
router.get("/detail", statisticalController.detail);
router.get("/week", statisticalController.week);
router.get("/year", statisticalController.year);
router.get("/month", statisticalController.month);
module.exports = router;
