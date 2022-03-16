"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("User", {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: Sequelize.INTEGER,
            },
            firstName: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            lastName: Sequelize.STRING(50),
            age: Sequelize.DOUBLE,
            email: {
                type: Sequelize.STRING(70),
                unique: true,
            },
            phoneNumber: {
                type: Sequelize.STRING(20),
                unique: true,
            },
            password: {
                type: Sequelize.STRING(200),
                allowNull: false,
            },
        });
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
    },
};
