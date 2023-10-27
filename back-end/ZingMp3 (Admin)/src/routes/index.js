const songRouter = require("./song");
const accountRouter = require("./account");
const userRouter = require("./user");
const searchRouter = require("./search");
const banAccountRouter = require("./banAccount");
const typeAccountRouter = require("./typeAccount");
const typeSongRouter = require("./typeSong");
const statisticalRouter = require("./statistical");
function router(app) {
  app.use("/statistical", statisticalRouter);
  app.use("/search", searchRouter);
  app.use("/song", songRouter);
  app.use("/user", userRouter);
  app.use("/account", accountRouter);
  app.use("/banAccount", banAccountRouter);
  app.use("/typeAccount", typeAccountRouter);
  app.use("/typeSong", typeSongRouter);
}
module.exports = router;
