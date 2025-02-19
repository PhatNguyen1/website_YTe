const {
  TechnicalServiceCategories,
  TechnicalServiceTypes,
  TechnicalService,
} = require("../models");
const { where } = require("sequelize");

class TechnicalServiceCategoryController {
  // getAll
  static async index(req, res) {
    try {
      const serviceCategory = await TechnicalServiceCategories.findAll({
        attributes: ['id', 'name'],
        include: [
          {
            model: TechnicalServiceTypes,
            as: "technical_service_types",
            attributes: ["id", "technicalServiceTypeName"],
            include: [{
              model: TechnicalService,
              as: "technical_service",
              attributes: ["technicalServiceId", "technicalServiceName", "price"],
              }
            ],
          },
        ],
      });
      return res.status(200).json(serviceCategory);
    } catch (error) {
      res.status(500).json({ error: "Không nhận được danh sách 'serviceCategory'" });
      console.log("Không nhận được danh sách 'serviceCategory'");
      throw error;
    }
  }

  static async show(req, res) {
    const categoryId = req.params.id
    try {
      const serviceCategory = await TechnicalServiceCategories.findOne({
        attributes: ['id', 'name'],
        where: {id: categoryId},
        include: [
          {
            model: TechnicalServiceTypes,
            as: "technical_service_types",
            attributes: ["id", "technicalServiceTypeName"],
            include: [{
              model: TechnicalService,
              as: "technical_service",
              attributes: ["technicalServiceId", "technicalServiceName", "price"],
              }
            ],
          },
        ],
      });
      return res.status(200).json(serviceCategory);
    } catch (error) {
      res.status(500).json({ error: "Không nhận được danh sách 'serviceCategory'" });
      console.log("Không nhận được danh sách 'serviceCategory'");
      throw error;
    }
  }
}

module.exports = TechnicalServiceCategoryController;
