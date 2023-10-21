const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("zing-clone", "datnguyen", "123456", {
  host: "localhost",
  dialect: "mssql",
  define: {
    timestamps: false,
  },
  dialectOptions: {
    options: {
      encrypt: true,
    },
  },
});
async function connect() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

module.exports = { connect, sequelize };
