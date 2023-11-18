const path = require("path");
const gateway = require("express-gateway");

gateway().load(path.join(__dirname, "config")).run();
// .then(() => {
//   console.log("1");
//   const myPolicy = {
//     name: "my-policy",
//     policy: require("./plugins/my-plugin/policies/my-policy.js"),
//   };
//   gateway().registerPolicy(myPolicy);
// })
// .catch((err) => {
//   console.error(err);
// });
