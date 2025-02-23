'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TechnicalServices extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TechnicalServices.belongsTo(models.TechnicalServiceType, {
        foreignKey: "technicalServiceTypeId",
        as: "__technicalservicetype",
      });
    }
  }
  TechnicalServices.init({
    technicalServerName: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TechnicalServices',
  });
  return TechnicalServices;
};