const middleware = require("../../../middleware/");
module.exports = {
  name: "verify-token",
  schema: {
    $id: "http://express-gateway.io/schemas/policies/my-policy.json",
    type: "object",
  },
  policy: (actionParams) => {
    return (req, res, next) => {
      middleware.verifyToken(req, res, next);
    };
  },
};
