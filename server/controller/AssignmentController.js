const { where } = require("sequelize");
const {
  sequelize,
  Assignments,
  AssignmentDetail,
  Services,
} = require("../models");

class AssignmentController {
  static async storeTest(req, res) {
    const { patientReceptionId, totalPrice, assignmentDetails } = req.body;

    const transaction = await sequelize.transaction();

    try {
      const newAssignment = await Assignments.create(
        {
          patientReceptionId,
          totalPrice,
        },
        { transaction }
      );

      console.log("Assignment created:", newAssignment.toJSON());

      const details = assignmentDetails.map((detail) => {
        console.log("Processing detail:", detail);
        return {
          assignmentId: newAssignment.id,
          serviceCode: detail.serviceCode,
          quantity: detail.quantity,
          unitPrice: detail.unitPrice,
          totalPrice: detail.totalPrice,
        };
      });

      console.log("Prepared details: ", details);

      const createdDetails = await AssignmentDetail.bulkCreate(details, {
        transaction,
      });

      console.log(
        "Created details:",
        createdDetails.map((d) => d.toJSON())
      );

      await transaction.commit();

      res.status(201).json({
        message: "Assignment created successfully",
        assignment: newAssignment,
        assignmentDetails: createdDetails,
      });
    } catch (error) {
      await transaction.rollback();
      console.error("Error details:", error);
      res
        .status(500)
        .json({ error: "Error creating Assignment", details: error.message });
    }
  }

  static async store(req, res) {
    const { patientReceptionId, assignmentDetails } = req.body;

    const transaction = await sequelize.transaction();

    try {
      // Lấy thông tin dịch vụ từ cơ sở dữ liệu
      const serviceCodes = assignmentDetails.map(
        (detail) => detail.serviceCode
      );

      const services = await Services.findAll({
        where: {
          ServiceCode: serviceCodes,
        },
        attributes: ["ServiceCode", "unitPrice"], // Giả sử cột giá trong bảng Services là 'Price'
        raw: true,
        transaction,
      });
      // console.log(services)
      // Tạo map để dễ dàng truy cập giá của từng dịch vụ
      const servicesPriceMap = services.reduce((acc, service) => {
        acc[service.ServiceCode] = service.unitPrice;
        return acc;
      }, {});
      // console.log(servicesPriceMap)

      // Tính toán lại giá và tổng giá
      let totalPrice = 0;
      const calculatedDetails = assignmentDetails.map((detail) => {
        const unitPrice = servicesPriceMap[detail.serviceCode];
        if (unitPrice === undefined) {
          throw new Error(`Service with code ${detail.serviceCode} not found`);
        }
        const detailTotalPrice = unitPrice * detail.quantity;
        totalPrice += detailTotalPrice;
        return {
          ...detail,
          unitPrice,
          totalPrice: detailTotalPrice,
        };
      });

      // Tạo assignment mới
      const newAssignment = await Assignments.create(
        {
          patientReceptionId,
          totalPrice,
        },
        { transaction }
      );

      console.log("Assignment created:", newAssignment.toJSON());

      // Tạo chi tiết assignment
      const details = calculatedDetails.map((detail) => ({
        assignmentId: newAssignment.id,
        serviceCode: detail.serviceCode,
        quantity: detail.quantity,
        unitPrice: detail.unitPrice,
        totalPrice: detail.totalPrice,
      }));

      const createdDetails = await AssignmentDetail.bulkCreate(details, {
        transaction,
      });

      await transaction.commit();

      res.status(201).json({
        message: "Assignment created successfully",
        assignment: newAssignment,
        assignmentDetails: createdDetails,
      });
    } catch (error) {
      await transaction.rollback();
      console.error("Error details:", error);
      res
        .status(500)
        .json({ error: "Error creating Assignment", details: error.message });
    }
  }

  static async index(req, res) {
    try {
      const Assignment = await Assignments.findAll();
      return res.status(200).json(Assignment);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Không nhận được danh sách 'Thanh toán Chỉ định'!" });
      console.log("Không nhận được danh sách 'Thanh toán Chỉ định'");
      throw error;
    }
  }

  static async show(req, res) {
    const id = req.params.id;
    try {
      const assignment = await Assignments.findAll({
        where: { patientReceptionId: id },
        include: [
          {
            model: AssignmentDetail,
            as: "assignment_detail",
          },
        ],
      });

      return res.status(200).json(assignment);
    } catch (error) {
      res.status(500).json({ error: "Không tìm được 'Đặt hẹn'" });
      console.log("Không tìm được 'Đặt hẹn'");
      throw error;
    }
  }
}

module.exports = AssignmentController;
