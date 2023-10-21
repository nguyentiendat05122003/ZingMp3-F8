const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db");
const PlayList = require("../models/PlayLists");
const Song = require("../models/Songs");
const PlayListSong = sequelize.define("PlayListSongs", {
  playListSongId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  playListId: {
    type: DataTypes.INTEGER,
    field: "playListId",
  },
  songId: {
    type: DataTypes.INTEGER,
    field: "songId",
  },
});

PlayListSong.belongsTo(PlayList, {
  foreignKey: "playListId",
});

PlayListSong.belongsTo(Song, {
  foreignKey: "songId",
});

sequelize
  .sync()
  .then(() => {
    console.log("Model connect successful");
  })
  .catch((error) => {
    console.error("Model connect failure :", error);
  });
module.exports = PlayListSong;
