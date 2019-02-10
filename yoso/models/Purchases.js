module.exports = function(sequelize, DataTypes) {
  var Purchase = sequelize.define("Purchase", {
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
    expiration: {
      type: DataTypes.STRING,
      allowNull: true
    },
    unitPrice: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
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
      allowNull: false
    }
  });

  return Purchase;
};
