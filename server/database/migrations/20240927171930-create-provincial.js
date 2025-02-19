'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Provincials', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ProvincialID: {
        type: Sequelize.INTEGER
      },
      STT: {
        type: Sequelize.INTEGER
      },
      ProvincialName: {
        type: Sequelize.TEXT
      },
      NationalityID: {
        type: Sequelize.INTEGER
      },
      ProvincialCode: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Provincials');
  }
};