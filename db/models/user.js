"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    User.init(
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: DataTypes.INTEGER,
            },
            firstName: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            lastName: DataTypes.STRING(50),
            age: DataTypes.DOUBLE,
            email: {
                type: DataTypes.STRING(70),
                unique: true,
            },
            phoneNumber: {
                type: DataTypes.STRING(20),
                unique: true,
            },
            password: {
                type: DataTypes.STRING(200),
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "User",
        },
    );
    return User;
};
