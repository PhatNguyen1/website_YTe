"use strict";
const { Model } = require("sequelize");
const servicegroups = require("./servicegroups");
module.exports = (sequelize, DataTypes) => {
  class ServiceCategories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ServiceCategories.hasMany(models.Services,{
        foreignKey: "ServiceCategoryCode",
        as: "services"
      })
    }
  }
  ServiceCategories.init(
    {
      STT: DataTypes.INTEGER,
      RowID: DataTypes.INTEGER,
      ServiceGroupCode: DataTypes.STRING,
      ServiceCategoryName: DataTypes.STRING,
      ServiceCategoryCode: { type: DataTypes.STRING, primaryKey: true },
    },
    {
      sequelize,
      modelName: "ServiceCategories",
      timestamps: false,
      defaultScope: {
        attributes: { exclude: ["id"] },
      },
    }
  );
  return ServiceCategories;
};
