module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        first: {
            type: DataTypes.STRING,
            validate: {
                len: [1, 30]
            }
        },
        last: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 30]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [1, 50]
            }
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                len: [1, 100]
            }
        },
        street: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 50]
            }
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 30]
            }
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 30]
            }
        },
        zip: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 5
            }
        }
    });
    return User;
};