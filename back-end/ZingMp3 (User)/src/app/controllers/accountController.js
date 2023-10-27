const Account = require("../models/Accounts");
class AccountController {
  //[GET] /account/:id
  async index(req, res) {
    try {
      const account = await Account.findOne({
        where: {
          accountId: req.params.id,
        },
      });
      const { password, ...rest } = account.dataValues;
      res.status(200).json(rest);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  //[DELETE] /account/:id/delete
  async delete(req, res) {
    try {
      await Account.destroy({
        where: {
          accountId: req.params.id,
        },
      });
      res.status(200).json("Delete successful");
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = new AccountController();
