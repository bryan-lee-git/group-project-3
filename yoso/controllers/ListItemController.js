const db = require("../models");

// Defining methods for the ListItemController
module.exports = {
  findAll: function (req, res) {
    db.ListItem.findAll({
        where: {
          ListId: req.body.listId
        }
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.ListItems.findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    db.ListItems.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  bulkCreate: function (req, res) {
    db.ListItems.bulkCreate(req.body.data, {
        fields: ["name", "ListId"]
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    db.ListItems.update(
      req.body, {
      where: {id: req.params.id}
    })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.ListItem.findOne({
        where: {
          ListId: req.body.listId,
          id: req.params.id
        }
      })
      .then(dbModel => dbModel.destroy())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};