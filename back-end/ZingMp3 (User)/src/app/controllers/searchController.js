const { sequelize } = require("../../config/db");
const { QueryTypes } = require("sequelize");
class SearchController {
  async search(req, res, next) {
    const listData = await sequelize.query(
      "Exec sp_search_song_artist_type :Search",
      {
        type: QueryTypes.SELECT,
        replacements: { Search: req.query.q },
      }
    );
    return res.status(200).json(listData);
  }
}
module.exports = new SearchController();
