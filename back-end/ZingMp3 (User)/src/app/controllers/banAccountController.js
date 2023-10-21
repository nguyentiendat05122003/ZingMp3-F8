const BanAccount = require("../models/BanAccount");
class BanAccountController {
  index(req, res) {
    const listData = BanAccount.findAll();
    res.status(200).json(listData);
  }
  // [POST] /banAccount/add
  async add(req, res) {
    try {
      const newBanAccount = await BanAccount.create({
        ...req.body,
      });
      res.status(200).json("ban account success");
    } catch (error) {
      res.status(500).json(`ban account failure : ${error}`);
    }
  }
}
module.exports = new BanAccountController();
