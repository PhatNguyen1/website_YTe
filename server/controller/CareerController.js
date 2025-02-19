const { where } = require("sequelize");
const { Career } = require("../models");

class CatalogEthnicController {
  // getAll
  static async index(req, res) {
    try {
      const career = await Career.findAll();
      return res.status(200).json(career);
    } catch (error) {
      res.status(500).json({ error: "Không nhận được danh sách 'Nghề nghiệp'" });
      console.log("Không nhận được danh sách 'Nghề nghiệp'");
      throw error;
    }
  }

  static async show(req, res) {
    const id = req.params.id;
    try {
      const career = await Career.findOne({
        where: { OccupationID: id },
      });

      if (!career) {
        return res.status(404).json({ error: "Không tìm thấy 'Nghề nghiệp'" });
      }

      return res.status(200).json(career);
    } catch (error) {
      res.status(500).json({ error: "Có lỗi xảy ra khi tìm 'Nghề nghiệp'" });
      console.log("Có lỗi xảy ra:", error);
      throw error;
    }
  }
}

module.exports = CatalogEthnicController;
