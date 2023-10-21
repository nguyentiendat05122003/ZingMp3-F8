const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db");
const TypeSong = sequelize.define(
  "TypeSongs",
  {
    typeSongId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
);

sequelize
  .sync()
  .then(() => {
    console.log("Model connect successful");
  })
  .catch((error) => {
    console.error("Model connect failure :", error);
  });

module.exports = TypeSong;
