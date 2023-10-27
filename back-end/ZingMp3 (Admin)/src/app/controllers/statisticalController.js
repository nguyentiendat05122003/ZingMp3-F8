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

  //[GET] statistical/detail
  async detail(req, res) {
    const data = await sequelize.query(
      "Exec sp_thongke_Song_User_Count_TheoTime :fr_NgayTao,:to_NgayTao",
      {
        type: QueryTypes.SELECT,
        replacements: {
          fr_NgayTao: req.query.fr_NgayTao,
          to_NgayTao: req.query.to_NgayTao,
        },
      }
    );
    res.status(200).json(data[0]);
  }
}

module.exports = new StatisticalController();
