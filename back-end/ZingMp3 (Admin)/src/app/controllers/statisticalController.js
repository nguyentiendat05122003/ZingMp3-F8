const { sequelize } = require("../../config/db");
const { QueryTypes } = require("sequelize");
class StatisticalController {
  //[GET] statistical/
  async index(req, res) {
    const data = await sequelize.query("Exec proc_statistical_general", {
      type: QueryTypes.SELECT,
    });
    res.status(200).json(data[0]);
  }
}

module.exports = new StatisticalController();
