const PatientRegistrationModel = require("../model/AppointmentModel");
// const AppointmentModel = require("../model/AppointmentModel");

class PatientRegistrationController {
  static async index(req, res) {
    try {
      const patientRegistration =
        await PatientRegistrationModel.getAllPatientRegistration();
      res.json(patientRegistration);
    } catch (error) {
      res.status(500).json({ error: "Lỗi: Không đọc được dữ liệu Patient" });
    }
  }

  static async store(req, res) {
    try {
      const data = req.body;
      console.log("Dữ liệu đã nhận: ", data);

      if (!data || Object.keys(data).length === 0) {
        return res.status(400).json({ error: "No data provided" });
      }

      const result = await PatientRegistrationModel.createPatientRegistration(
        data
      );
      res
        .status(201)
        .json({ message: "Lịch hẹn đăng ký thành công", data: result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Lỗi: Không đăng ký được Patient" });
      throw error;
    }
  }

  static async show(req, res) {
    try {
      const consultationTypes =
        await PatientRegistrationModel.getConsultationTypes();
      res.status(200).json(consultationTypes);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Lỗi: Không thể lấy dữ liệu ConsultationTypes" });
      throw error;
    }
  }
}

module.exports = PatientRegistrationController;
