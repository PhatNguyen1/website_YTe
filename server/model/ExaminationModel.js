const { DataTypes } = require("sequelize");
const sequelize = require("../config/configSequelize");
// console.log(sequelize);

class ExaminationModel {
  //
  static init() {
    if (!this.Examination) {
      this.Examination = sequelize.define(
        "Examination",
        {
          examinationId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: "examination_id",
          },
          //1
          serviceId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "service_id",
          },
          //2
          clinicId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "clinic_id",
          },
          //3
          doctorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "doctor_id",
          },
          //4
          quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "quantity",
          },
          //5
          price: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            field: "price",
          },
          //6
          paymentStatus: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: "Pending",
            field: "payment_status",
          },
          //7
          executionStatus: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: "Not Started",
            field: "execution_status",
          },
          //8
          userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "user_id",
          },
          //9
          assignmentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "assignment_id",
          },
        },
        {
          tableName: "Examination", // Tên bảng trong cơ sở dữ liệu
          timestamps: false, // Tự động thêm createdAt và updatedAt
          // createdAt: "created_at",
          // updatedAt: "updated_at",
        }
      );
    }
  }
  // CRUD
  // Tạo mới một Examination
  static async createExamination(data) {
    // Khởi tạo model nếu chưa được khởi tạo
    this.init();

    const {
      serviceId,
      clinicId,
      doctorId,
      quantity,
      price,
      paymentStatus,
      executionStatus,
      userId,
      assignmentId,
    } = data;

    try {
      const newExamination = await this.Examination.create({
        serviceId,
        clinicId,
        doctorId,
        quantity,
        price,
        paymentStatus,
        executionStatus,
        userId,
        assignmentId,
      });

      return newExamination;
    } catch (error) {
      console.error("Lỗi tạo examination:", error);
      throw new Error("Không thể tạo examination");
    }
  }
  //Get by Id
  static async getExaminationById(examinationId) {
    this.init();

    try {
      const examination = await this.Examination.findByPk(examinationId);
      if (!examination) {
        throw new Error("Examination không tồn tại!");
      }
      return examination;
    } catch (error) {
      console.error("Lỗi lấy examination: ", error);
      throw new error("Không thể lấy examination");
    }
  }
  //Get all
  static async getAllExamination() {
    this.init();
    try {
      const examination = await this.Examination.findAll();
      if (!examination) {
        console.log("Khong co Examination nao!");
      }
      return examination;
    } catch (error) {
      console.error("Lỗi lấy examinate: ", error);
      throw new error("Không thể lấy examination");
    }
  }
  //Delete
  static async deleteExamination(id) {
    this.init();
    try {
      const examination = await this.Examination.findByPk(id);
      await examination.destroy();
      return examination;
    } catch (error) {
      console.error("Lỗi xóa examinate: ", error);
      throw new error("Không thể xóa examination");
    }
  }
  //Update
  static async updateExamination(id, updatedData) {
    this.init();
    try {
      const examination = await this.Examination.findByPk(id);
      await examination.update(updatedData);

      return examination;
    } catch (error) {
      console.error("Lỗi cập nhật examinate: ", error);
      throw new error("Không thể cập nhật examination");
    }
  }
}

module.exports = ExaminationModel;
