const User = require("../models/Users");
const {
  ref,
  getDownloadURL,
  uploadBytesResumable,
} = require("firebase/storage");
const giveCurrentDateTime = require("../../utils/giveCurrentDateTime");
const { sequelize } = require("../../config/db");
const storage = require("../../config/fireBase");
const { QueryTypes } = require("sequelize");
class UserController {
  //[GET] user/
  async index(req, res) {
    const listUser = await User.findAll({
      where: { accountId: process.env.ID_ARTIST },
    });
    res.status(200).json(listUser);
  }

  //[POST] user/add
  async add(req, res, next) {
    try {
      const dateTime = giveCurrentDateTime();
      const storageRef = ref(
        storage,
        `avatar/${req.file.originalname + dateTime}`
      );
      const metadata = {
        contentType: req.file.mimetype,
      };
      const snapshot = await uploadBytesResumable(
        storageRef,
        req.file.buffer,
        metadata
      );
      const downloadURLAvatar = await getDownloadURL(snapshot.ref);
      const newUser = await User.create({
        ...req.body,
        image: downloadURLAvatar,
      });
      res.status(200).json("add user successful");
    } catch (error) {
      console.log(error);
    }
  }

  //[PUT] user/:id/edit
  async edit(req, res) {
    const user = await User.findOne({
      where: { userId: req.params.id },
    });
    if (user) {
      try {
        const updatedData = req.body;
        const dateTime = giveCurrentDateTime();
        if (req.file) {
          const imageStoragePath = `avatar/${req.file.originalname + dateTime}`;
          const imageStorageRef = ref(storage, imageStoragePath);
          const imageMetadata = { contentType: req.file.mimetype };
          const imageSnapshot = await uploadBytesResumable(
            imageStorageRef,
            req.file.buffer,
            imageMetadata
          );
          updatedData.image = await getDownloadURL(imageSnapshot.ref);
        }
        await User.update(
          { ...updatedData },
          {
            where: {
              userId: req.params.id,
            },
          }
        );
        res.json("edit success");
      } catch (error) {
        res.json(error);
      }
    } else {
      res.json("user not found");
    }
  }

  //[DELETE] user/:id/delete
  async delete(req, res) {
    await User.destroy({
      where: {
        userId: req.params.id,
      },
    });
    res.status(200).json("Delete successful");
  }

  //[GET] user/artist
  async getArtist(req, res) {
    const listArtist = await sequelize.query("Exec pro_GetArtist ", {
      type: QueryTypes.SELECT,
    });
    res.json(listArtist);
  }
}

module.exports = new UserController();
