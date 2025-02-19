const { where } = require("sequelize");
const { Catalog_Nationality } = require("../models");

class Catalog_NationalityController {
  // getAll
  static async index(req, res) {
    try {
      const nationality = await Catalog_Nationality.findAll();
      return res.status(200).json(nationality);
    } catch (error) {
      res.status(500).json({ error: "Không nhận được danh sách 'Quốc tịch'" });
      console.log("Không nhận được danh sách 'Quốc tịch'");
      throw error;
    }
  }

  static async show(req, res) {
    const id = req.params.id;
    try {
      const nationality = await Catalog_Nationality.findOne({
        where: { NationalityId: id },
      });

      if (!nationality) {
        return res.status(404).json({ error: "Không tìm thấy 'Quốc tịch'" });
      }

      return res.status(200).json(nationality);
    } catch (error) {
      res.status(500).json({ error: "Có lỗi xảy ra khi tìm 'Quốc tịch'" });
      console.log("Có lỗi xảy ra:", error);
      throw error;
    }
  }
}

module.exports = Catalog_NationalityController;
