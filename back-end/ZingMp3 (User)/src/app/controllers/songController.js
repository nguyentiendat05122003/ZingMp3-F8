const Song = require("../models/Songs");
const {
  ref,
  getDownloadURL,
  uploadBytesResumable,
} = require("firebase/storage");
const giveCurrentDateTime = require("../../utils/giveCurrentDateTime");
const storage = require("../../config/fireBase");
const { sequelize } = require("../../config/db");
const { QueryTypes } = require("sequelize");
class SongControllers {
  //[GET] song/
  async index(req, res) {
    const listSong = await Song.findAll();
    res.json(listSong);
  }

  //[POST] song/add
  async add(req, res, next) {
    if (!req.files["image"] && !req.files["source"]) {
      res.status(500).json("add song failure because miss audio or image");
    } else {
      try {
        const dateTime = giveCurrentDateTime();
        const storageRef = ref(
          storage,
          `images/${req.files["image"][0].originalname + dateTime}`
        );
        const metadata = {
          contentType: req.files["image"][0].mimetype,
        };
        const snapshot = await uploadBytesResumable(
          storageRef,
          req.files["image"][0].buffer,
          metadata
        );
        const downloadURLImage = await getDownloadURL(snapshot.ref);
        const storageRefAudio = ref(
          storage,
          `source/${req.files["source"][0].originalname + dateTime}`
        );
        const metadataAudio = {
          contentType: "audio/mp3",
        };
        const snapshotAudio = await uploadBytesResumable(
          storageRefAudio,
          req.files["source"][0].buffer,
          metadataAudio
        );
        const downloadURLAudio = await getDownloadURL(snapshotAudio.ref);
        const newSong = Song.create({
          ...req.body,
          image: downloadURLImage,
          source: downloadURLAudio,
        });
        res.status(200).json("add song successful");
      } catch (error) {
        next(error);
      }
    }
  }

  //[PUT] song/:id/edit
  async edit(req, res) {
    try {
      const updatedData = req.body;
      if (req.files["image"]) {
        const imageStoragePath = `images/${req.files["image"][0].originalname}`;
        const imageStorageRef = ref(storage, imageStoragePath);
        const imageMetadata = { contentType: req.files["image"][0].mimetype };
        const imageSnapshot = await uploadBytesResumable(
          imageStorageRef,
          req.files["image"][0].buffer,
          imageMetadata
        );
        updatedData.image = await getDownloadURL(imageSnapshot.ref);
      }
      if (req.files["source"]) {
        const audioStoragePath = `source/${req.files["source"][0].originalname}`;
        const audioStorageRef = ref(storage, audioStoragePath);
        const audioMetadata = { contentType: "audio/mp3" };
        const audioSnapshot = await uploadBytesResumable(
          audioStorageRef,
          req.files["source"][0].buffer,
          audioMetadata
        );
        updatedData.source = await getDownloadURL(audioSnapshot.ref);
      }
      await Song.update(
        { ...updatedData },
        {
          where: {
            songId: req.params.id,
          },
        }
      );
      res.json("edit success");
    } catch (error) {
      res.json(error);
    }
  }

  //[DELETE] song/:artistId/delete/:id
  async delete(req, res) {
    await Song.destroy({
      where: {
        songId: req.params.id,
      },
    });
    res.status(200).json("Delete successful");
  }

  //[GET] song/newSongs
  async getNewSong(req, res) {
    const listNewSong = await sequelize.query("Exec pro_getNewSong ", {
      type: QueryTypes.SELECT,
    });
    res.json(listNewSong);
  }

  //[GET] song/typeSong/:id
  async getSongFollowTypeSong(req, res) {
    const listSong = await sequelize.query(
      "Exec pro_getSongFollowTypeSong :typeSongId",
      {
        type: QueryTypes.SELECT,
        replacements: { typeSongId: req.params.id },
      }
    );
    res.json(listSong);
  }

  //[GET] song/:artistId
  async getSongFollowArtist(req, res) {
    try {
      const data = await sequelize.query(
        "Exec proc_getArtistAndSongs :userId",
        {
          type: QueryTypes.SELECT,
          replacements: { userId: req.params.artistId },
        }
      );
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  //[GET] search?q=mck
  async search(req, res, next) {
    const listDat = await sequelize.query("Exec pro_getSearchData", {
      type: QueryTypes.SELECT,
    });
    const query = req.query.q;
    const valueSearch = query.toString().toLowerCase();
    let listDataMatch = [];
    listDat.forEach((data) => {
      for (let x in data) {
        if (typeof data[x] === "string") {
          if (data[x].toString().toLowerCase().includes(valueSearch)) {
            listDataMatch = [...listDataMatch, data];
            return;
          }
        }
      }
    });
    if (listDataMatch.length >= 1) {
      res.status(200).json(listDataMatch);
    } else {
      res.status(200).json("Not found");
    }
  }
}
module.exports = new SongControllers();
