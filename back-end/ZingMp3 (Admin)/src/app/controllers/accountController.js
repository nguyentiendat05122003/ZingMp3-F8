const { QueryTypes } = require("sequelize");
const { sequelize } = require("../../config/db");
const Account = require("../models/Accounts");
const bcrypt = require("bcrypt");

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
      console.log(error);
      res.status(500).json(error);
    }
  }

  //[POST] /account/:id/changePassword
  async changePassword(req, res) {
    try {
      const account = await Account.findOne({
        where: {
          accountId: req.params.id,
        },
      });
      const validPassword = await bcrypt.compare(
        req.body.oldPassword,
        account.password
      );
      if (!validPassword) {
        return res.status(404).json("wrong password");
      }
      if (account && validPassword) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);
        const result = await sequelize.query(
          "Exec update_account_password :accountId,:newPassword",
          {
            type: QueryTypes.UPDATE,
            replacements: {
              accountId: req.params.id,
              newPassword: hashedPassword,
            },
          }
        );
        return res.status(200).json("Change Password Success");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = new AccountController();
