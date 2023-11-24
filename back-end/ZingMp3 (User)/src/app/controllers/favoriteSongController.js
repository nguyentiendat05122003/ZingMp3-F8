const { sequelize } = require("../../config/db");
const { QueryTypes } = require("sequelize");
const FavoriteSong = require("../models/FavoriteSong");
class FavoriteSongController {
  //[GET] favoriteSong/:userId
  async index(req, res, next) {
    const result = await sequelize.query(
      "Exec pro_getListFavoriteSong :userId",
      {
        type: QueryTypes.SELECT,
        replacements: { userId: req.params.userId },
      }
    );
    return res.status(200).json(result);
  }

  //[POST] favoriteSong/add?songId=2&userId=4
  async add(req, res, next) {
    try {
      const newFavoriteSong = await FavoriteSong.create({
        ...req.query,
      });
      res.status(200).json("FavoriteSong success");
    } catch (error) {
      res.status(500).json(`FavoriteSong failure : ${error}`);
    }
  }

  // [POST] favoriteSong/delete?songId=2&userId=4
  async delete(req, res) {
    try {
      const result = await sequelize.query(
        "Exec pro_unFavoriteSongFromUser :songId,:userId",
        {
          type: QueryTypes.DELETE,
          replacements: {
            songId: req.query.songId,
            userId: req.query.userId,
          },
        }
      );
      res.status(200).json("delete favoriteSong success");
    } catch (error) {
      res.status(500).json(`delete favoriteSong failure : ${error}`);
    }
  }
}
module.exports = new FavoriteSongController();
