const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db");
const User = require("./Users");
const PlayList = sequelize.define("PlayLists", {
  playListId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    field: "userId",
  },
});

PlayList.belongsTo(User, {
  foreignKey: "userId",
});

sequelize
  .sync()
  .then(() => {
    console.log("Model connect successful");
  })
  .catch((error) => {
    console.error("Model connect failure :", error);
  });
module.exports = PlayList;
