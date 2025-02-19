'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Career extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Career.init({
    OccupationID: {type: DataTypes.INTEGER,
      primaryKey: true,
    },
    OccupationName: DataTypes.TEXT,
    OccupationCode: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Career',
    tableName: "Career",
    timestamps: false
  });
  return Career;
};