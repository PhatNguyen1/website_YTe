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
    //   "technicalservices",
    //   [
    //     {
    //       technicalServiceName: "Siêu âm ổ bụng",
    //       price: 1100,
    //       description: "Test seed",
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //     },
    //   ],
    //   {}
    // );
    // await queryInterface.bulkInsert(
    //   "technicalservices",
    //   [
    //     {
    //       technicalServiceName: "Siêu âm tuyến giáp",
    //       price: 1200,
    //       description: "Test seed",
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //     },
    //   ],
    //   {}
    // );
    // await queryInterface.bulkInsert(
    //   "technicalservices",
    //   [
    //     {
    //       technicalServiceName: "Siêu âm các tuyến nước bọt",
    //       price: 1300,
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
    await queryInterface.bulkDelete('technicalservices', null, {});
  },
};
