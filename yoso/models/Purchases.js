module.exports = function(sequelize, DataTypes) {
  var Purchase = sequelize.define("Purchase", {
    unitSize: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    sizeQuantity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    weightMeasure: {
      type: DataTypes.STRING,
      allowNull: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    expiration: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    unitPrice: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    location: {
      type: DataTypes.STRING,
      validate: {
        len: [1, 75]
      }
    },
    simDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    ordinal: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  });

  return Purchase;
};
