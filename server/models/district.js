'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class District extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  District.init({
    district_id: {type: DataTypes.INTEGER,
      primaryKey: true
    },
    district_name: DataTypes.TEXT,
    ProvincialId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'District',
    tableName: "District",  
      // defaultScope: {
      //   attributes: { exclude: ["id"] },
      // },
      timestamps: false,
  });
  return District;
};