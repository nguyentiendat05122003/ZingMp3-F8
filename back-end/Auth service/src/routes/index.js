const authRouter = require("./auth");
function router(app) {
  app.use("/auth", authRouter);
}
module.exports = router;
