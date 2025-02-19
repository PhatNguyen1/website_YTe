const { where } = require("sequelize");
const { District } = require("../models");

class DistrictController {
  static async index(req, res) {
    const { ProvincialID } = req.query; 
    
    let whereClause = {};

    if (ProvincialID) {
      whereClause.ProvincialId = ProvincialID;
    }

    try {
      const districts = await District.findAll({
        where: whereClause,
      });

      return res.status(200).json(districts);
    } catch (error) {
      res.status(500).json({ error: "Không nhận được danh sách 'Huyện'" });
      console.log("Không nhận được danh sách 'Huyện'", error);
      throw error;
    }
  }

  static async show(req, res) {
    const id = req.params.id;
    try {
      const district = await District.findOne({
        where: { district_id: id },
      });

      if (!district) {
        return res.status(404).json({ error: "Không tìm thấy 'Huyện'" });
      }

      return res.status(200).json(district);
    } catch (error) {
      res.status(500).json({ error: "Có lỗi xảy ra khi tìm 'Huyện'" });
      console.log("Có lỗi xảy ra:", error);
      throw error;
    }
  }
}

module.exports = DistrictController;
