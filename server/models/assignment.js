"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Assignment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Assignment.belongsTo(models.TechnicalServiceType, {
        foreignKey: "technicalServiceTypeId",
        as: "assiment__technicalServiceType",
      });
    }
  }
  Assignment.init(
    {
      technicalServiceTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "TechnicalServiceTypes",
          key: "id",
        },
      },
      // totalPrice: DataTypes.DECIMAL,
      notes: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Assignment",
    }
  );
  return Assignment;
};
