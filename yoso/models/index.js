"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(file => {
    const model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Users = require("./Users")(sequelize, Sequelize);
db.Purchases = require("./Purchases")(sequelize, Sequelize);
db.List = require("./List")(sequelize, Sequelize);
db.ListItems = require("./ListItem")(sequelize, Sequelize);
db.Pantry = require("./Pantry")(sequelize, Sequelize);

db.Users.hasMany(db.List);
db.Pantry.belongsTo(db.Users);
db.Pantry.hasMany(db.Purchases);
db.List.hasMany(db.ListItems, { onDelete: "cascade", hooks: true });
db.ListItems.belongsTo(db.List);

module.exports = db;
