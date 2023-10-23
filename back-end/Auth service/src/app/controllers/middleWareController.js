const jwt = require("jsonwebtoken");
const Song = require("../models/Songs");
const { sequelize } = require("../../config/db");
const { QueryTypes } = require("sequelize");
class MiddleWareController {
  verifyToken(req, res, next) {
    const token = req.headers.token;
    if (token) {
      const accessToken = token.split(" ")[1];
      jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET_KEY,
        (err, account) => {
          if (err) {
            res.status(403).json("Token is not valid");
          }
          req.account = account;
          next();
        }
      );
    } else {
      res.status(404).json("you're not authenticated");
    }
  }
  verifyTokenAndAdminAuth = (req, res, next) => {
    this.verifyToken(req, res, () => {
      if (req.account.typeAccountId === process.env.ID_AMIN) {
        next();
      } else {
        res.status(403).json("you're not allowed to delete other");
      }
    });
  };
  verifyTokenAndArtistAuth = (req, res, next) => {
    this.verifyToken(req, res, () => {
      if (req.account.typeAccountId === process.env.ID_ARTIST) {
        next();
      } else {
        res.status(403).json("you're not allowed to use function");
      }
    });
  };
}
module.exports = new MiddleWareController();
