const PlayListSong = require("../models/PlayListSongs");
const { sequelize } = require("../../config/db");
const { QueryTypes } = require("sequelize");
class PlayListSongControllers {
  //[GET] /playListSong/:id
  async index(req, res) {
    const listPLayListSong = await sequelize.query(
      "Exec GetSongsInPlaylist :playListId",
      {
        type: QueryTypes.SELECT,
        replacements: { playListId: req.params.id },
      }
    );
    res.json(listPLayListSong);
  }

  //[POST] /playListSong/add
  async add(req, res) {
    const newPLayList = PlayListSong.create({
      ...req.body,
    });
    res.status(200).json("add Song into PlayList successful");
  }

  //[DELETE] /playListSong/:id/delete/:songId
  async delete(req, res) {
    const result = await sequelize.query(
      "Exec deleteSongInPlayList :songId,:playListId",
      {
        type: QueryTypes.DELETE,
        replacements: { playListId: req.params.id, songId: req.params.songId },
      }
    );
    return res.status(200).json("Delete successful");
  }
}
module.exports = new PlayListSongControllers();
