// const ExaminationModel = require("../model/ExaminationModel");
const {
  TechnicalServiceType,
  TechnicalServices,
  Assignment,
  sequelize
} = require("../models");

class ExaminationController {
  static async store(req, res) {
    try {
      const data = req.body;
      const result = await ExaminationModel.createExamination(data);
      res.status(200).json({ message: "Examinate thêm thành công!", result });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Lỗi thêm Examinate!", error: error.message });
      throw error;
    }
  }

  static async show(req, res) {
    const { id } = req.params;

    try {
      const examination = await ExaminationModel.getExaminationById(id);
      return res.status(200).json(examination);
    } catch (error) {
      console.error("Lỗi lấy examination: ", error);
      return res.status(500).json({ error: "examination không tồn tại" });
    }
  }

  static async index(req, res) {
    try {
      const examination = await ExaminationModel.getAllExamination();
      return res.status(200).json(examination);
    } catch (error) {
      console.error("Lỗi lấy examination: ", error);
      return res.status(500).json({ error: "examination không tồn tại" });
    }
  }
  //
  static async destroy(req, res) {
    const { id } = req.params;
    try {
      const examination = await ExaminationModel.deleteExamination(id);
      return res.status(200).json({ message: "Đã xóa thành công" });
    } catch (error) {
      console.error("Lỗi xóa examination: ", error);
      return res.status(500).json({ error: "examination không tồn tại" });
    }
  }
  static async update(req, res) {
    const { id } = req.params;
    const dataBody = req.body;

    try {
      const examination = await ExaminationModel.getExaminationById(id);

      if (!examination) {
        return json("không timg thấy Examination");
      }

      const updatedExamination = await ExaminationModel.updateExamination(
        id,
        dataBody
      );
      return res.status(200).json(updatedExamination);
    } catch (error) {
      console.error("Lỗi cập nhật examination: ", error);
      return res.status(500).json({ error: "examination chưa được cập nhật!" });
    }
  }







  
  //Update Total
  static async total(req, res) {
    const t = await sequelize.transaction();
    try {
      // Lấy danh sách id của các dịch vụ kỹ thuật
      const { tsIds } = req.body;

      // Tạo assignment mới
      const assignment = await Assignment.create(
        { totalPrice: 0 },
        { transaction: t }
      );
  
      let totalPrice = 0;
      const technicalServiceTypes = [];
  
      // Lấy thông tin các dịch vụ kỹ thuật và tính tổng giá
      for (const tsId of tsIds) {
        const ts = await TechnicalServices.findByPk(tsId);
        if (!ts) {
          throw new Error(`Không tìm được Dịch vụ có id là ${tsId}`);
        }
        
        technicalServiceTypes.push({
          assignmentId: assignment.id,
          technicalServiceId: ts.id,
          quantity: 1, // Giả sử mỗi dịch vụ có số lượng là 1, có thể điều chỉnh nếu cần
          price: ts.price
        });
  
        totalPrice += ts.price;
      }
  
      // Tạo các bản ghi TechnicalServiceType
      await TechnicalServiceType.bulkCreate(technicalServiceTypes, { transaction: t });
  
      // Cập nhật tổng giá cho assignment
      await assignment.update({ totalPrice }, { transaction: t });
  
      await t.commit();
      
      // Lấy assignment đã được cập nhật cùng với các dịch vụ kỹ thuật
      const updatedAssignment = await Assignment.findByPk(assignment.id, {
        include: [{
          model: TechnicalServices,
          through: TechnicalServiceType
        }],
        transaction: t
      });
  
      res.json(updatedAssignment);
    } catch (error) {
      await t.rollback();
      res.status(500).json({ error: error.message });
      throw error
    }
  }
}

module.exports = {
  ExaminationController,
};
