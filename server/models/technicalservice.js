'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TechnicalService extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // TechnicalService.belongsTo(models.TechnicalServiceTypes,{
      //   foreignKey: 'technicalServiceTypeId',
      //   as: 'technical_service_type'
      // })
    }
  }
  TechnicalService.init({
    technicalServiceId:{
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    technicalServiceName: DataTypes.TEXT,
    technicalServiceTypeId: DataTypes.INTEGER,
    price: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'TechnicalService',
    tableName: 'TechnicalServices',
    defaultScope: {
        attributes: { exclude: ["id"] },
      },
  });
  return TechnicalService;
};