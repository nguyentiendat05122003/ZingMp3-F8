const { sequelize } = require("../../config/db");
const Follow = require("../models/Follow");
const { QueryTypes } = require("sequelize");
class FollowController {
  async index(req, res) {
    const listData = await Follow.findAll();
    res.status(200).json(listData);
  }

  // [POST] /follower/add
  async follower(req, res) {
    try {
      const newFollow = await Follow.create({
        ...req.query,
      });
      res.status(200).json("follow success");
    } catch (error) {
      res.status(500).json(`follow failure : ${error}`);
    }
  }
  // [POST] /follower/add
  async unFollower(req, res) {
    try {
      const result = await sequelize.query(
        "Exec pro_unFollowFromUser :useIdFollowed,:userId",
        {
          type: QueryTypes.DELETE,
          replacements: {
            useIdFollowed: req.query.useIdFollowed,
            userId: req.query.userId,
          },
        }
      );
      res.status(200).json("unFollow success");
    } catch (error) {
      res.status(500).json(`unFollow failure : ${error}`);
    }
  }
}
module.exports = new FollowController();
