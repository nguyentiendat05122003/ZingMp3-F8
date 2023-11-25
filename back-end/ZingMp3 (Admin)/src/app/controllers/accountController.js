const { QueryTypes } = require("sequelize");
const { sequelize } = require("../../config/db");
const Account = require("../models/Accounts");
class AccountController {
  //[GET] /account
  async index(req, res) {
    try {
      const listAccount = await Account.findAll();
      res.status(200).json(listAccount);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  //[DELETE] /account/:id/delete
  async delete(req, res) {
    try {
      const result = await sequelize.query("Exec delete_Account :id", {
        type: QueryTypes.DELETE,
        replacements: { id: req.params.id },
      });
      res.status(200).json("Delete successful");
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = new AccountController();
