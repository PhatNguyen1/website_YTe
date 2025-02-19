const { where } = require("sequelize");
const { Departments } = require("../models");

class DepartmentsController {
  // getAll
  static async index(req, res) {
    try {
      const departments = await Departments.findAll();
      return res.status(200).json(departments);
    } catch (error) {
      res.status(500).json({ error: "Không nhận được danh sách 'Khoa khám'" });
      console.log("Không nhận được danh sách 'Khoa khám'");
      throw error;
    }
  }

  static async show(req, res) {
    const id = req.params.id;
    try {
      const departments = await Departments.findByPk(id)

      if (!departments) {
        return res.status(404).json({ error: "Không tìm thấy 'Khoa khám'" });
      }

      return res.status(200).json(departments);
    } catch (error) {
      res.status(500).json({ error: "Có lỗi xảy ra khi tìm 'Khoa khám'" });
      console.log("Có lỗi xảy ra:", error);
      throw error;
    }
  }
}

module.exports = DepartmentsController;
