"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Services extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Services.init(
    {
      ServiceCode: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      RowID: DataTypes.INTEGER,
      ServiceCategoryCode: DataTypes.STRING,
      ServiceName: DataTypes.STRING,
      unitPrice: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "Services",
      timestamps: false,
      defaultScope: {
        attributes: { exclude: ["id"] },
      },
    }
  );
  return Services;
};
