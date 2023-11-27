const jwt = require("jsonwebtoken");
class MiddleWareController {
  verifyToken(req, res, next) {
    const token = req.headers.token;
    if (token) {
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, "dat dep trai", (err, account) => {
        if (err) {
          res.status(403).json("Token is not valid");
        }
        req.account = account;
        next();
      });
    } else {
      res.status(403).json("you're not authenticated");
    }
  }
  verifyTokenAndArtistAuth = (req, res, next) => {
    this.verifyToken(req, res, () => {
      if (req.account.typeAccount == 2) {
        next();
      } else {
        res.status(403).json("you're not allowed to use function");
      }
    });
  };
  verifyTokenAndArtistSelfAuth = (req, res, next) => {
    this.verifyToken(req, res, () => {
      if (
        req.account.typeAccount == 2 &&
        req.account.accountId == req.params.id
      ) {
        next();
      } else {
        res.status(403).json("you're not allowed to use function");
      }
    });
  };
  verifyTokenAndSelfAuth = (req, res, next) => {
    this.verifyToken(req, res, () => {
      if (req.account.accountId == req.params.id) {
        next();
      } else {
        res.status(403).json("you're not allowed to use function");
      }
    });
  };
  verifyTokenAndAdminAuth = (req, res, next) => {
    this.verifyToken(req, res, () => {
      if (req.account.typeAccount == 1) {
        next();
      } else {
        res.status(403).json("you're not allowed to use function");
      }
    });
  };
  verifyTokenAndAdminSelfAuth = (req, res, next) => {
    this.verifyToken(req, res, () => {
      if (
        req.account.typeAccount == 1 &&
        req.account.accountId == req.params.id
      ) {
        next();
      } else {
        res.status(403).json("you're not allowed to use function");
      }
    });
  };
}
module.exports = new MiddleWareController();
