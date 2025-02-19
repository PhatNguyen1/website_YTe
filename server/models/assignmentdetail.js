"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AssignmentDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AssignmentDetail.init(
    {
      assignmentId: DataTypes.INTEGER,
      serviceCode: DataTypes.STRING,
      // technicalServiceId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      unitPrice: DataTypes.DECIMAL,
      totalPrice: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "AssignmentDetail",
      tableName: "AssignmentDetails",
      timestamps: false,
    }
  );
  return AssignmentDetail;
};
