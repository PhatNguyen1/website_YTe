"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Appointments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
    }
  }
  Appointments.init(
    {
      fullName: {
        type: DataTypes.TEXT,
      },
      phoneNumber: {
        type: DataTypes.TEXT,
      },
      gender: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false, // Sửa lỗi cú pháp và giá trị mặc định
      },
      nationalityId: {
        type: DataTypes.INTEGER,
        defaultValue: 1, // Sửa lỗi cú pháp cho defaultValue
      },
      ethnicId: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      career: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: "Appointments",
      timestamps: false,
    }
  );

  return Appointments;
};
