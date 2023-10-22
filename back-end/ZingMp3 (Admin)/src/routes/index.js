const authRouter = require("./auth");
const songRouter = require("./song");
const accountRouter = require("./account");
const userRouter = require("./user");
const searchRouter = require("./search");
const banAccountRouter = require("./banAccount");
const typeAccountRouter = require("./typeAccount");
function router(app) {
  app.use("/search", searchRouter);
  app.use("/auth", authRouter);
  app.use("/song", songRouter);
  app.use("/user", userRouter);
  app.use("/account", accountRouter);
  app.use("/banAccount", banAccountRouter);
  app.use("/typeAccount", typeAccountRouter);
}
module.exports = router;
