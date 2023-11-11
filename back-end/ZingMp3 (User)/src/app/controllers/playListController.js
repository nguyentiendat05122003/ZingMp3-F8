const PlayList = require("../models/PlayLists");
class PlayListControllers {
  //[GET] /playList
  async index(req, res) {
    const listPLayList = await PlayList.findAll({
      where: { userId: req.params.userId },
    });
    res.json(listPLayList);
  }

  //[POST] /playList/add
  async add(req, res) {
    const newPLayList = PlayList.create({
      ...req.body,
    });
    res.status(200).json("add playList successful");
  }

  //[PUT] /playList/:id/edit
  async edit(req, res) {
    await PlayList.update(
      { ...req.body },
      {
        where: {
          playListId: req.params.id,
        },
      }
    );
    res.json("edit success");
  }

  //[DELETE] /playList/:id/delete
  async delete(req, res) {
    await PlayList.destroy({
      where: {
        playListId: req.params.id,
      },
    });
    res.status(200).json("Delete successful");
  }
}
module.exports = new PlayListControllers();
