const middleware = require("../../../middleware");
module.exports = {
  name: "verifyUserSelf-token",
  schema: {
    $id: "http://express-gateway.io/schemas/policies/verifyUserSelf-token.json",
    type: "object",
  },
  policy: (actionParams) => {
    return (req, res, next) => {
      middleware.verifyTokenAndSelfAuth(req, res, next);
    };
  },
};
