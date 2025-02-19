const { where } = require("sequelize");
const { Catalog_Ethnic } = require("../models");

class CatalogEthnicController {
  // getAll
  static async index(req, res) {
    try {
      const catalogEthnic = await Catalog_Ethnic.findAll();
      return res.status(200).json(catalogEthnic);
    } catch (error) {
      res.status(500).json({ error: "Không nhận được danh sách 'Dân tộc'" });
      console.log("Không nhận được danh sách 'Dân tộc'");
      throw error;
    }
  }

  static async show(req, res) {
    const id = req.params.id;
    try {
      const catalogEthnic = await Catalog_Ethnic.findOne({
        where: { EThnicID: id },
      });

      if (!catalogEthnic) {
        return res.status(404).json({ error: "Không tìm thấy 'Dân tộc'" });
      }

      return res.status(200).json(catalogEthnic);
    } catch (error) {
      res.status(500).json({ error: "Có lỗi xảy ra khi tìm 'Dân tộc'" });
      console.log("Có lỗi xảy ra:", error);
      throw error;
    }
  }
}

module.exports = CatalogEthnicController;
