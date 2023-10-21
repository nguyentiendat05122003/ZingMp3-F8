const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db");
const Account = require("./Accounts");
const User = sequelize.define(
  "Users",
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthDay: {
      type: DataTypes.DATE,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
    },
    desc: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    isBan: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    accountId: {
      type: DataTypes.INTEGER,
      field: "accountId",
    },
  },
  { timestamps: true }
);

User.belongsTo(Account, {
  foreignKey: "accountId",
});

sequelize
  .sync()
  .then(() => {
    console.log("Model connect successful");
  })
  .catch((error) => {
    console.error("Model connect failure :", error);
  });

module.exports = User;
