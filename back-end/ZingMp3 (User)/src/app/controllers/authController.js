const Account = require("../models/Accounts");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
class AuthController {
  //[POST] /register
  async register(req, res) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const account = await Account.create({
        ...req.body,
        password: hashedPassword,
      });
      res.send("register successful");
    } catch (error) {
      res.status(500).json(err);
    }
  }

  //[POST] /login
  //create jwt after login
  async login(req, res) {
    try {
      const account = await Account.findOne({
        where: {
          username: req.body.username,
          typeAccountId: req.body.typeAccountId,
        },
      });
      if (!account) {
        return res.status(404).json("wrong username or wrong role");
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        account.password
      );
      if (!validPassword) {
        return res.status(404).json("wrong password");
      }
      if (account && validPassword) {
        const accessToken = jwt.sign(
          {
            id: account.id,
            typeAccount: account.typeAccountId,
          },
          process.env.ACCESS_TOKEN_SECRET_KEY,
          { expiresIn: "365d" }
        );
        const { password, ...rest } = account.dataValues;
        //Why we need expiresIn because token can lost so after expiresIn token is'nt use
        res.status(200).json({ account: rest, accessToken });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
module.exports = new AuthController();
