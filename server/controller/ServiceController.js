const {
  ServiceGroups,
  ServiceCategories,
  Services
} = require("../models");
const { where } = require("sequelize");

class ServiceController {
  // getAll
  static async index(req, res) {
    try {
      const { serviceGroupCode } = req.query;

      const serviceGroup = await ServiceGroups.findAll({
        attributes: ["STT", "RowID", "ServiceGroupCode", "ServiceGroupName"],
        where: serviceGroupCode ? { ServiceGroupCode: serviceGroupCode } : {},
        include: [
          {
            model: ServiceCategories,
            as: "service_categories",
            attributes: ["STT", "RowID", "ServiceCategoryCode", "ServiceCategoryName", "ServiceGroupCode"],
            where: serviceGroupCode ? { ServiceGroupCode: serviceGroupCode } : {},
            include: [
              {
                model: Services,
                as: "services",
                attributes: ["RowID", "ServiceCode", "ServiceCategoryCode", "ServiceGroupCode", "ServiceName", "unitPrice"],
              }
            ],
          },
        ],
      });
      return res.status(200).json(serviceGroup);
    } catch (error) {
      res.status(500).json({ error: "Không nhận được danh sách 'services'" });
      console.log("Không nhận được danh sách 'services'");
      throw error;
    }
  }

  static async show(req, res) {
    const categoryId = req.params.id
    try {
      const serviceCategory = await TechnicalServiceCategories.findOne({
        attributes: ['id', 'name'],
        where: { id: categoryId },
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

module.exports = ServiceController;
