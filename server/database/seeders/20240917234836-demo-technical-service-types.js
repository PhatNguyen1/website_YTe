"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    // await queryInterface.bulkInsert(
    //   "technicalservicetypes",
    //   [
    //     {
    //       technicalServiceTypeName: "Siêu âm",
    //       technicalServiceId: 1,
    //       description: "Test seed",
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //     },
    //   ],
    //   {}
    // );
    // await queryInterface.bulkInsert(
    //   "technicalservicetypes",
    //   [
    //     {
    //       technicalServiceTypeName: "X - Quang loại khác",
    //       technicalServiceId: 1,
    //       description: "Test seed",
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //     },
    //   ],
    //   {}
    // );
    // await queryInterface.bulkInsert(
    //   "technicalservicetypes",
    //   [
    //     {
    //       technicalServiceTypeName: "X - Quang ngực",
    //       technicalServiceId: 1,
    //       description: "Test seed",
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //     },
    //   ],
    //   {}
    // );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('technicalservicetypes', null, {});
  },
};
