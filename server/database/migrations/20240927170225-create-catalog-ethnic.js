'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Catalog_Ethnics', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      EThnicID: {
        type: Sequelize.INTEGER
      },
      STT: {
        type: Sequelize.INTEGER
      },
      EThnicName: {
        type: Sequelize.TEXT
      },
      NationalityID: {
        type: Sequelize.INTEGER
      },
      EThnic_Code: {
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
    await queryInterface.dropTable('Catalog_Ethnics');
  }
};