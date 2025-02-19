"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ward extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Ward.init(
    {
      ward_id: { type: DataTypes.INTEGER,
        primaryKey: true },
      ward_name: DataTypes.TEXT,
      district_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Ward",
      tableName: "Ward",
      timestamps: false,

    }
  );
  return Ward;
};
