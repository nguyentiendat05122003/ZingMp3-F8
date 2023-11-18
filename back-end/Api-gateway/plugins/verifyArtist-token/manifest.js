module.exports = {
  version: "0.0.1",
  init: function (pluginContext) {
    let policy = require("./policies/verifyArtist-token");
    pluginContext.registerPolicy(policy);
  },
  policies: ["verifyArtist-token"],
  schema: {
    $id: "https://express-gateway.io/schemas/plugins/verifyArtist-token.json",
  },
};
