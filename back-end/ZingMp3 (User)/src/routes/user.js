const express = require("express");
const router = express.Router();
const userController = require("../app/controllers/userController");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const middlewareController = require("../app/controllers/middleWareController");
router.get("/getArtist", userController.getArtist);
router.get("/", userController.index);
router.post("/add", upload.single("image"), userController.add);
router.put("/:id/edit", upload.single("image"), userController.edit);
router.delete("/:id/delete", userController.delete);

module.exports = router;
