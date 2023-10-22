const express = require("express");
const router = express.Router();
const typeAccountController = require("../app/controllers/typeAccountController");
router.get("/", typeAccountController.index);
router.post("/add", typeAccountController.add);
router.put("/:id/edit", typeAccountController.edit);
router.delete("/:id/delete", typeAccountController.delete);

module.exports = router;
