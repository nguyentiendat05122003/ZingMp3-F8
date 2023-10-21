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
    console.log("Mô hình đã được đồng bộ hóa với cơ sở dữ liệu.");
  })
  .catch((error) => {
    console.error("Lỗi khi đồng bộ hóa mô hình:", error);
  });
module.exports = BanAccount;
