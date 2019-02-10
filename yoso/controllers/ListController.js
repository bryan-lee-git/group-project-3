const db = require("../models");

// Defining methods for the ListController
module.exports = {
  findAll: function(req, res) {
    db.List.findAll({
      where: { UserId: req.body.userId }
    })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.List.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findYosoList: function(req, res) {
    db.List.findAll({
      where: {
        UserId: req.params.id,
        name: "YOSO List"
      }
    })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.List.create({
      UserId: req.body.UserId,
      name: req.body.name
    })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  createListWithItems: function(req, res) {
    db.List.create(
      {
        UserId: req.body.UserId,
        name: req.body.name,
        ListItems: req.body.items //must be an array of objects!!
      },
      { include: [db.ListItem] }
    )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.List.findOneAndUpdate(
      {
        where: {
          userId: req.body.userId,
          listId: req.params.listId
        }
      },
      req.body.data
    )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  destroy: function(req, res) {
    db.List.destroy({
      where: {
        UserId: req.body.userId,
        id: req.params.id
      }
    })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
