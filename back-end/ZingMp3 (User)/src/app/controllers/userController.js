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
  //[GET] user/accountId
  async index(req, res) {
    const user = await User.findAll({
      where: { accountId: req.params.accountId },
    });
    res.status(200).json(user);
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

  //[PUT] user/edit
  async edit(req, res) {
    const accountId = req.body.accountId;
    const user = await User.findOne({
      where: { accountId: accountId },
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
              accountId: accountId,
            },
          }
        );
        return res.status(200).json("edit success");
      } catch (error) {
        return res.status(200).json(error);
      }
    } else {
      res.json("user not found");
    }
  }

  //[DELETE] user/:id/delete
  async delete(req, res) {
    await User.destroy({
      where: {
        accountId: req.params.id,
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

  //[GET] user/FollowArtist/:id
  async getFollowArtistFromUser(req, res) {
    const listSong = await sequelize.query(
      "Exec pro_getFollowerArtistFromUser :useIdFollowed",
      {
        type: QueryTypes.SELECT,
        replacements: { useIdFollowed: req.params.id },
      }
    );
    res.json(listSong);
  }
}

module.exports = new UserController();
