const express = require("express");
const router = express.Router();
const songController = require("../app/controllers/songController");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const middlewareController = require("../app/controllers/middleWareController");
router.get("/", songController.index);
router.post(
  "/add",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "source", maxCount: 1 },
  ]),
  songController.add
);
router.put(
  "/:id/edit",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "source", maxCount: 1 },
  ]),
  songController.edit
);
router.delete(
  "/:id/delete",
  middlewareController.verifyTokenAndArtistAuth,
  songController.delete
);

module.exports = router;
