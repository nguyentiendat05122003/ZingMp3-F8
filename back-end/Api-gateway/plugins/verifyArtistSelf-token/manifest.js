module.exports = {
  version: "0.0.1",
  init: function (pluginContext) {
    let policy = require("./policies/verifyArtistSelf-token");
    pluginContext.registerPolicy(policy);
  },
  policies: ["verifyArtistSelf-token"],
  schema: {
    $id: "https://express-gateway.io/schemas/plugins/verifyArtistSelf-token.json",
  },
};
