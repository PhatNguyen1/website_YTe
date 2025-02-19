'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Assignments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      patient_reception_id: {
        type: Sequelize.INTEGER
      },
      technicalServiceName: {
        type: Sequelize.TEXT
      },
      notes: {
        type: Sequelize.TEXT
      },
      assignment_date: {
        type: Sequelize.DATE
      },
      execution_date: {
        type: Sequelize.DATE
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.DECIMAL
      },
      totalPrice: {
        type: Sequelize.DECIMAL
      },
      doctor_id: {
        type: Sequelize.INTEGER
      },
      technician_id: {
        type: Sequelize.INTEGER
      },
      Done: {
        type: Sequelize.BOOLEAN
      },
      Paid: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('Assignments');
  }
};