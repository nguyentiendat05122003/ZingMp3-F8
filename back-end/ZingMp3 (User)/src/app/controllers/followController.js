const Follow = require("../models/Follow");
class FollowController {
  index(req, res) {
    const listData = Follow.findAll();
    res.status(200).json(listData);
  }
}
module.exports = new FollowController();
