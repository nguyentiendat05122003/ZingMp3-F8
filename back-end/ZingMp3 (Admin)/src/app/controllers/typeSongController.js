const { QueryTypes } = require("sequelize");
const TypeSong = require("../models/TypeSongs");
const { sequelize } = require("../../config/db");
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

  //[POST] /typeSong/add
  async add(req, res) {
    try {
      const newTypeSong = await TypeSong.create({
        ...req.body,
      });
      res.status(200).json("add successful");
    } catch (error) {
      res.status(500).json(error);
    }
  }

  //[PUT] /typeSong/edit/:id
  async edit(req, res) {
    try {
      await TypeSong.update(req.body, {
        where: {
          typeSongId: req.params.id,
        },
      });
      res.status(200).json("edit successful");
    } catch (error) {
      res.status(500).json(error);
    }
  }

  //[DELETE] /typeSong/delete/:id
  async delete(req, res) {
    await TypeSong.destroy({
      where: {
        typeSongId: req.params.id,
      },
    });
    res.status(200).json("Delete successful");
  }

  //[POST] /typeSong/customApi
  async custom(req, res) {
    const results = await sequelize.query(
      "Exec sp_type_song_update_insert_delete :list_json_listType",
      {
        replacements: {
          list_json_listType: JSON.stringify(req.body),
        },
      }
    );
    res.json("update successful");
  }
}

module.exports = new TypeSongController();
