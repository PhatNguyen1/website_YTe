"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TechnicalServiceType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TechnicalServiceType.hasMany(models.Assignment, {
        foreignKey: "technicalServiceTypeId",
        as: "assignments",
      });
      TechnicalServiceType.belongsTo(models.TechnicalServices, {
        foreignKey: "technicalServiceId",
        as: "__technicalservice",
      });
    }
  }
  TechnicalServiceType.init(
    {
      technicalServiceTypeName: DataTypes.STRING,
      totalPrice: DataTypes.DECIMAL,
      notes: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "TechnicalServiceType",
    }
  );
  return TechnicalServiceType;
};
