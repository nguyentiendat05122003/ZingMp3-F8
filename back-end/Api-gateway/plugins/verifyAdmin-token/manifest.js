module.exports = {
  version: "0.0.1",
  init: function (pluginContext) {
    let policy = require("./policies/verifyAdmin-token");
    pluginContext.registerPolicy(policy);
  },
  policies: ["verifyAdmin-token"],
  schema: {
    $id: "https://express-gateway.io/schemas/plugins/verifyAdmin-token.json",
  },
};
