const { sequelize } = require("../../config/db");
const { QueryTypes } = require("sequelize");
class SearchController {
  async search(req, res, next) {
    const listDat = await sequelize.query("Exec pro_getSearchData", {
      type: QueryTypes.SELECT,
    });
    const query = req.query.q;
    const valueSearch = query.toString().toLowerCase();
    let listDataMatch = [];
    listDat.forEach((data) => {
      for (let x in data) {
        if (typeof data[x] === "string") {
          if (data[x].toString().toLowerCase().includes(valueSearch)) {
            listDataMatch = [...listDataMatch, data];
            return;
          }
        }
      }
    });
    if (listDataMatch.length >= 1) {
      res.status(200).json(listDataMatch);
    } else {
      res.status(200).json("Not found");
    }
  }
}
module.exports = new SearchController();
