module.exports = {
  version: "0.0.1",
  init: function (pluginContext) {
    let policy = require("./policies/verifyUserSelf-token");
    pluginContext.registerPolicy(policy);
  },
  policies: ["verifyUserSelf-token"],
  schema: {
    $id: "https://express-gateway.io/schemas/plugins/verifyUserSelf-token.json",
  },
};
