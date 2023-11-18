const middleware = require("../../../middleware");
module.exports = {
  name: "verifyAdmin-token",
  schema: {
    $id: "http://express-gateway.io/schemas/policies/verifyAdmin-token.json",
    type: "object",
  },
  policy: (actionParams) => {
    return (req, res, next) => {
      middleware.verifyTokenAndAdminAuth(req, res, next);
    };
  },
};
