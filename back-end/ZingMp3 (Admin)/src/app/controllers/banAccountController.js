const { QueryTypes } = require("sequelize");
const { sequelize } = require("../../config/db");
const BanAccount = require("../models/BanAccount");
class BanAccountController {
  // [GET]  /banAccount
  index(req, res) {
    const listData = BanAccount.findAll();
    res.status(200).json(listData);
  }
  // [POST] /banAccount/add/:id
  async banAccount(req, res) {
    try {
      const result = await sequelize.query("Exec pro_banAccountFromAdmin :id", {
        type: QueryTypes.SELECT,
        replacements: { id: req.params.id },
      });
      res.status(200).json("ban account success");
    } catch (error) {
      res.status(500).json(`ban account failure : ${error}`);
    }
  }

  // [POST] /banAccount/delete/:id
  async unBanAccount(req, res) {
    try {
      const result = await sequelize.query(
        "Exec pro_unBanAccountFromAdmin :id",
        {
          type: QueryTypes.SELECT,
          replacements: { id: req.params.id },
        }
      );
      res.status(200).json("unBan account success");
    } catch (error) {
      res.status(500).json(`unBan account failure : ${error}`);
    }
  }
}
module.exports = new BanAccountController();
