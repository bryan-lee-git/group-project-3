module.exports = function(sequelize, DataTypes) {
  var ListItem = sequelize.define("ListItem", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    unitSize: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    measurement: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  });
  return ListItem;
};
