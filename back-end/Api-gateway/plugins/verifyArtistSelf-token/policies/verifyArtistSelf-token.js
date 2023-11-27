const middleware = require("../../../middleware");
module.exports = {
  name: "verifyArtistSelf-token",
  schema: {
    $id: "http://express-gateway.io/schemas/policies/verifyArtistSelf-token.json",
    type: "object",
  },
  policy: (actionParams) => {
    return (req, res, next) => {
      middleware.verifyTokenAndArtistSelfAuth(req, res, next);
    };
  },
};
