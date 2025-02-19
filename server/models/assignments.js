"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Assignments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Assignments.hasMany(models.AssignmentDetail,{
        foreignKey: "assignmentId",
        as: "assignment_detail"
      })
    }
  }
  Assignments.init(
    {
      patientReceptionId: {
        type: DataTypes.INTEGER,
        field: "patient_reception_id",
      },
      notes: DataTypes.TEXT,
      assignment_date: DataTypes.DATE,
      quantity: DataTypes.INTEGER,
      totalPrice: DataTypes.DECIMAL,
      doctor_id: DataTypes.INTEGER,
      Done: DataTypes.BOOLEAN,
      Paid: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Assignments",
      timestamps: false,
    }
  );
  return Assignments;
};
