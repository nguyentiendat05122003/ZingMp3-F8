const TypeSong = require("../models/TypeSongs");
class TypeSongController {
  //[GET] /typeSong
  async index(req, res) {
    try {
      const lisTypeSong = await TypeSong.findAll();
      res.status(200).json(lisTypeSong);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = new TypeSongController();
