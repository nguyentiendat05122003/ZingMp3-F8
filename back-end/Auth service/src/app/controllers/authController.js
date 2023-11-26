const Account = require("../models/Accounts");
const bcrypt = require("bcrypt");
require("dotenv").config();
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
      const { password, ...rest } = account.dataValues;
      return res.status(200).json(rest);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  //[POST] /login
  async login(req, res) {
    try {
      const account = await Account.findOne({
        where: {
          username: req.body.username,
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
            accountId: account.accountId,
            typeAccount: account.typeAccountId,
          },
          process.env.ACCESS_TOKEN_SECRET_KEY,
          { expiresIn: "30d" }
        );
        const refreshToken = jwt.sign(
          {
            accountId: account.accountId,
            typeAccount: account.typeAccountId,
          },
          process.env.ACCESS_TOKEN_SECRET_KEY,
          { expiresIn: "365d" }
        );
        const { password, ...rest } = account.dataValues;
        return res
          .status(200)
          .json({ account: rest, accessToken, refreshToken });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  //[POST] /refresh
  requestRefreshToken(req, res) {
    // const refreshToken = req.cookies.refreshToken;
    const refreshToken = req.headers.a;
    if (!refreshToken) return res.status(401).json("You're not authenticated");
    jwt.verify(
      refreshToken,
      process.env.ACCESS_TOKEN_SECRET_KEY,
      (err, account) => {
        if (err) {
          console.log(err);
        }
        const newAccessToken = jwt.sign(
          {
            accountId: account.accountId,
            typeAccount: account.typeAccountId,
          },
          process.env.ACCESS_TOKEN_SECRET_KEY,
          { expiresIn: "30s" }
        );

        // res.cookie("refreshToken", newRefreshToken, {
        //   httpOnly: true,
        //   secure: false,
        //   path: "/",
        //   sameSite: "strict",
        // });
        res.status(200).json({
          accessToken: newAccessToken,
        });
      }
    );
  }

  //[POST] /logout
  logOut(req, res) {
    res.clearCookie("refreshToken");
    res.status(200).json("Logged out successfully!");
  }
}
module.exports = new AuthController();
