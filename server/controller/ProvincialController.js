const { where } = require("sequelize");
const { Provincial } = require("../models");

class ProvincialController {
  // getAll
  static async index(req, res) {
    try {
      const provincial = await Provincial.findAll();
      return res.status(200).json(provincial);
    } catch (error) {
      res.status(500).json({ error: "Không nhận được danh sách 'Tỉnh'" });
      console.log("Không nhận được danh sách 'Tỉnh'");
      throw error;
    }
  }

  static async show(req, res) {
    const id = req.params.id;
    try {
      const provincial = await Provincial.findOne({
        where: { ProvincialId: id },
      });

      if (!provincial) {
        return res.status(404).json({ error: "Không tìm thấy 'Tỉnh'" });
      }

      return res.status(200).json(provincial);
    } catch (error) {
      res.status(500).json({ error: "Có lỗi xảy ra khi tìm 'Tỉnh'" });
      console.log("Có lỗi xảy ra:", error);
      throw error;
    }
  }

  static async showCode(req, res) {
    const code = req.params.code;
    try {
      const provincial = await Provincial.findOne({
        where: { ProvincialCode: code },
      });

      if (!provincial) {
        return res.status(404).json({ error: "Không tìm thấy 'Tỉnh'" });
      }

      return res.status(200).json(provincial);
    } catch (error) {
      res.status(500).json({ error: "Có lỗi xảy ra khi tìm 'Tỉnh'" });
      console.log("Có lỗi xảy ra:", error);
      throw error;
    }
  }
}

module.exports = ProvincialController;
