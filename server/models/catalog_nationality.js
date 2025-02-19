"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Catalog_Nationality extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Catalog_Nationality.init(
    {
      NationalityId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      NationalityName: DataTypes.TEXT,
      NationalityCode: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Catalog_Nationality",
      tableName: "Catalog_Nationality",
      defaultScope: {
        attributes: { exclude: ["id"] },
      },
    }
  );
  return Catalog_Nationality;
};
