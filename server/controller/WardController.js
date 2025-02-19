const { where } = require("sequelize");
const { Ward } = require("../models");

class WardController {
  // getAll
  static async index(req, res) {
    const { district_id } = req.query; 
    const filter = district_id ? { where: { district_id } } : {}; 

    try {
      const ward = await Ward.findAll(filter);
      return res.status(200).json(ward);
    } catch (error) {
      res.status(500).json({ error: "Không nhận được danh sách 'Phường'" });
      console.log("Không nhận được danh sách 'Phường'");
      throw error;
    }
  }

  static async show(req, res) {
    const id = req.params.id;
    try {
      const ward = await Ward.findOne({
        where: { ward_id: id },
      });

      if (!ward) {
        return res.status(404).json({ error: "Không tìm thấy 'Phường'" });
      }

      return res.status(200).json(ward);
    } catch (error) {
      res.status(500).json({ error: "Có lỗi xảy ra khi tìm 'Phường'" });
      console.log("Có lỗi xảy ra:", error);
      throw error;
    }
  }
}

module.exports = WardController;
