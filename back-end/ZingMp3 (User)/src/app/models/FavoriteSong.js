const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db");
const Song = require("./Songs");
const User = require("./Users");
const FavoriteSong = sequelize.define("FavoriteSongs", {
  favoriteSongId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  songId: {
    type: DataTypes.INTEGER,
    field: "songId",
  },
  userId: {
    type: DataTypes.INTEGER,
    field: "userId",
  },
});

FavoriteSong.belongsTo(User, {
  foreignKey: "userId",
});

FavoriteSong.belongsTo(Song, {
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
module.exports = FavoriteSong;
