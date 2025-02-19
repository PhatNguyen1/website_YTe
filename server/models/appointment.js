"use strict";
const { Model, DATE } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Appointment.init(
    {
      fullName: DataTypes.TEXT,
      phoneNumber: DataTypes.TEXT,
      gender: DataTypes.BOOLEAN,
      status: DataTypes.BOOLEAN,
      timer: DataTypes.TIME,
      appointmentDate: DataTypes.DATE,
      address: DataTypes.TEXT,
      EthnicId: DataTypes.INTEGER,
      NationalityID: DataTypes.INTEGER,
      ProvincialID: DataTypes.INTEGER,
      district_id: DataTypes.INTEGER,
      ward_id: DataTypes.INTEGER,
      career: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Appointment",
      tableName: "Appointments",
      timestamps: false,
    }
  );
  return Appointment;
};
