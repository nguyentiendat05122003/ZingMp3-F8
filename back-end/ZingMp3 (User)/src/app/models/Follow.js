const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db");
const User = require("./Users");
const Follow = sequelize.define("Follows", {
  followId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  useIdFollowed: {
    type: DataTypes.INTEGER,
    references: {
      model: "Users",
      key: "userId",
    },
  },
});

Follow.belongsTo(User, { foreignKey: "userId" });

sequelize
  .sync()
  .then(() => {
    console.log("Model connect successful");
  })
  .catch((error) => {
    console.error("Model connect failure :", error);
  });
module.exports = Follow;
