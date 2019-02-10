const db = require("../models");

// Defining methods for the PantryController
module.exports = {
  /////////
  // Called by pantry.js matching "/api/pantry/all Method: POST"
  /////////

  findAll: function(req, res) {
    console.log(
      `\ninside findall of pantry, here's the req.body: `,
      req.body.UserId
    );
    db.Pantry.findAll({
      where: {
        UserId: req.body.UserId
      },
      order: [[req.body.sort, "ASC"]]
    })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  /////////
  // Called by pantry.js matching "/api/pantry/name Method: POST"
  /////////

  findOne: function(req, res) {
    console.log(`\n\n Inside pantry findone, here's req.body: `, req.body);
    db.Pantry.findOne({
      where: {
        UserId: req.body.UserId,
        name: req.body.name
      }
    })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  /////////
  // Called by pantry.js matching "/api/pantry/:id Method: GET"
  /////////

  findOneById: function(req, res) {
    db.Pantry.findOne({
      where: { id: req.params.id }
    })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  /////////
  // Called by pantry.js matching "/api/pantry/:id Method: POST"
  /////////

  findOrCreate: function(req, res) {
    const {
      name,
      shelfLife,
      frequency,
      stock,
      UserId,
      description,
      category
    } = req.body;
    db.Pantry.findOrCreate({
      where: {
        UserId: UserId,
        name: name
      },
      defaults: {
        name: name,
        shelfLife: shelfLife,
        frequency: frequency,
        stock: stock,
        description: description,
        category: category
      }
    })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  /////////
  // Called by pantry.js matching "/api/pantry/:id Method: PUT"
  /////////

  update: function(req, res) {
    console.log(
      `inside update method of pantry controller, here's the incoming data: req.params: ${
        req.params
      } and req.body: `,
      req.body
    );

    db.Pantry.update(req.body, { where: { id: req.params.id } })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  /////////
  // Called by pantry.js matching "/api/pantry/:id Method: DELETE"
  /////////

  remove: function(req, res) {
    console.log(
      `\nInside pantrycontroller, remove method, here's req.params: `,
      req.params.id
    );
    db.Pantry.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
