const middleware = require("../../../middleware");
module.exports = {
  name: "verifyArtist-token",
  schema: {
    $id: "http://express-gateway.io/schemas/policies/verifyArtist-token.json",
    type: "object",
  },
  policy: (actionParams) => {
    return (req, res, next) => {
      console.log("run");
      middleware.verifyTokenAndArtistAuth(req, res, next);
    };
  },
};
