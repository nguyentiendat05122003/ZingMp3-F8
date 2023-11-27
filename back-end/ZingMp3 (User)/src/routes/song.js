const express = require("express");
const router = express.Router();
const songController = require("../app/controllers/songController");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const middlewareController = require("../app/controllers/middleWareController");

router.get("/vietnam", songController.getSongVietNam);
router.get("/otherCountry", songController.getSongOtherCountry);
router.get("/artist/:artistId", songController.getSongFollowArtist);
router.get("/newSongs", songController.getNewSong);
router.get("/typeSong/:typeSongId", songController.getSongFollowTypeSongDetail);
router.get("/typeSong", songController.getSongFollowTypeSong);
router.get("/", songController.index);
router.post(
  "/add/:id",
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
  "/:artistId/delete/:id",
  middlewareController.verifyTokenAndArtistSelfAuth,
  songController.delete
);
module.exports = router;
