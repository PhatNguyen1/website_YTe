"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ServiceGroups extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ServiceGroups.hasMany(models.ServiceCategories,{
        foreignKey: "ServiceGroupCode",
        as: "service_categories"
      })
    }
  }
  ServiceGroups.init(
    {
      STT: DataTypes.INTEGER,
      RowID: DataTypes.INTEGER,
      ServiceGroupCode: { type: DataTypes.STRING, primaryKey: true },
      ServiceGroupName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ServiceGroups",
      timestamps: false,
      defaultScope: {
        attributes: { exclude: ["id"] },
      },
    }
  );
  return ServiceGroups;
};
