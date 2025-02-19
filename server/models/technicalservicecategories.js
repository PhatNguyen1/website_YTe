'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TechnicalServiceCategories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TechnicalServiceCategories.hasMany(models.TechnicalServiceTypes,{
        foreignKey: 'TechnicalServiceCategoryId',
        as: 'technical_service_types'
      })
    }
  }
  TechnicalServiceCategories.init({
    name: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'TechnicalServiceCategories',
  });
  return TechnicalServiceCategories;
};