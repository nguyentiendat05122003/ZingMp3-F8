const TypeAccount = require("../models/TypeAccounts");
class TypeAccountController {
  //[GET] /typeAccount
  async index(req, res) {
    try {
      const listTypeAccount = await TypeAccount.findAll();
      res.status(200).json(listTypeAccount);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  //[POST] /typeAccount/add
  async add(req, res) {
    try {
      const newTypeAccount = await TypeAccount.create({
        ...req.body,
      });
      res.status(200).json("add successful");
    } catch (error) {
      res.status(500).json(error);
    }
  }

  //[PUT] /typeAccount/edit/:id
  async edit(req, res) {
    try {
      await TypeAccount.update(req.body, {
        where: {
          typeAccountId: req.params.id,
        },
      });
      res.status(200).json("edit successful");
    } catch (error) {
      res.status(500).json(error);
    }
  }

  //[DELETE] /typeAccount/delete/:id
  async delete(req, res) {
    await TypeAccount.destroy({
      where: {
        typeAccountId: req.params.id,
      },
    });
    res.status(200).json("Delete successful");
  }
}

module.exports = new TypeAccountController();
