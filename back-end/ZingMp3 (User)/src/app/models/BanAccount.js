const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db");
const User = require("./Users");
const BanAccount = sequelize.define("BanAccounts", {
  BanAccountId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  useIdBanAccounted: {
    type: DataTypes.INTEGER,
    references: {
      model: "Users",
      key: "userId",
    },
  },
});

BanAccount.belongsTo(User, { foreignKey: "userId" });

sequelize
  .sync()
  .then(() => {
    console.log("Model connect successful");
  })
  .catch((error) => {
    console.error("Model connect failure :", error);
  });
module.exports = BanAccount;
