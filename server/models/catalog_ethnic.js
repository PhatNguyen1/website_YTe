"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Catalog_Ethnic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Catalog_Ethnic.init(
    {
      EThnicID: { type: DataTypes.INTEGER, primaryKey: true },
      STT: DataTypes.INTEGER,
      EThnicName: DataTypes.TEXT,
      NationalityID: DataTypes.INTEGER,
      EThnic_Code: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Catalog_Ethnic",
      tableName: "Catalog_Ethnic",  
      defaultScope: {
        attributes: { exclude: ["id"] },
      },
      timestamps: false,
    }
  );
  return Catalog_Ethnic;
};
