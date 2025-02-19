"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TechnicalServiceTypes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // TechnicalServiceTypes.belongsTo(models.TechnicalServiceCategories, {
      //   foreignKey: 'technicalServiceCategoryId',
      //   as: 'technical_service_categories'
      // });

      TechnicalServiceTypes.hasMany(models.TechnicalService, {
        foreignKey: "technicalServiceTypeId",
        as: "technical_service",
      });
    }
  }
  TechnicalServiceTypes.init(
    {
      technicalServiceTypeName: DataTypes.TEXT,
      technicalServiceCategoryId: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      price: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "TechnicalServiceTypes",
    }
  );
  return TechnicalServiceTypes;
};
