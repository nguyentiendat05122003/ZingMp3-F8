const authRouter = require("./auth");
const songRouter = require("./song");
const playListRouter = require("./playList");
const playListSongRouter = require("./playListSong");
const accountRouter = require("./account");
const userRouter = require("./user");
const searchRouter = require("./search");
const followRouter = require("./follow");
const banAccountRouter = require("./banAccount");
function router(app) {
  app.use("/search", searchRouter);
  app.use("/auth", authRouter);
  app.use("/song", songRouter);
  app.use("/playListSong", playListSongRouter);
  app.use("/playList", playListRouter);
  app.use("/user", userRouter);
  app.use("/account", accountRouter);
  app.use("/follow", followRouter);
  app.use("/banAccount", banAccountRouter);
}
module.exports = router;
