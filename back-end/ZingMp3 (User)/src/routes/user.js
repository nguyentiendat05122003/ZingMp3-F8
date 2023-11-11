const express = require("express");
const router = express.Router();
const cors = require("cors");
const userController = require("../app/controllers/userController");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.get("/getArtist", userController.getArtist);
router.get("/:accountId", userController.index);
router.get("/getFollowArtist/:id", userController.getFollowArtistFromUser);
router.put("/edit", upload.single("image"), userController.edit);
router.post("/add", upload.single("image"), userController.add);
router.delete("/:id/delete", userController.delete);

module.exports = router;
