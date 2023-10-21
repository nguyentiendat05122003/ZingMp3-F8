const BanAccount = require("../models/BanAccount");
class BanAccountController {
  index(req, res) {
    const listData = BanAccount.findAll();
    res.status(200).json(listData);
  }
}
module.exports = new BanAccountController();
