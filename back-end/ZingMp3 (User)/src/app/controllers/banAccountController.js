const { sequelize } = require("../../config/db");
const { QueryTypes } = require("sequelize");
const BanAccount = require("../models/BanAccount");
class BanAccountController {
  index(req, res) {
    const listData = BanAccount.findAll();
    res.status(200).json(listData);
  }
  // [POST] /banAccount/add
  async banAccount(req, res) {
    try {
      const newBanAccount = await BanAccount.create({
        ...req.query,
      });
      res.status(200).json("ban account success");
    } catch (error) {
      res.status(500).json(`ban account failure : ${error}`);
    }
  }
  // [POST] /banAccount/add
  async unBanAccount(req, res) {
    try {
      const result = await sequelize.query(
        "Exec pro_unBanAccountFromUser :useIdBanAccounted,:userId",
        {
          type: QueryTypes.DELETE,
          replacements: {
            useIdBanAccounted: req.query.useIdBanAccounted,
            userId: req.query.userId,
          },
        }
      );
      res.status(200).json("unBan account success");
    } catch (error) {
      res.status(500).json(`unBan account failure : ${error}`);
    }
  }
}
module.exports = new BanAccountController();
