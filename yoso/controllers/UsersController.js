const db = require("../models");

// Defining methods for the UsersController
module.exports = {
  findOne: function(req, res) {
    db.User.find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.User.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => {
        res.status(422).json(err);
      });
  },
  update: function(req, res) {
    db.User.update(
      {
        first: req.body.first,
        last: req.body.last,
        email: req.body.email,
        password: req.body.password,
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip
      },
      {
        where: {
          email: req.params.id
        }
      }
    )
      .then(dbModel => res.json(dbModel))
      .catch(err => {
        res.status(422).json(err);
      });
  },
  remove: function(req, res) {
    db.User.findById({
      _id: req.params.id
    })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
