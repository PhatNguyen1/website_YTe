'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Provincial extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Provincial.init({
    ProvincialID: {type: DataTypes.INTEGER,
      primaryKey: true
    },
    STT: DataTypes.INTEGER,
    ProvincialName: DataTypes.TEXT,
    NationalityID: DataTypes.INTEGER,
    ProvincialCode: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Provincial',
    tableName: "Provincial",
    timestamps: false,

  });
  return Provincial;
};