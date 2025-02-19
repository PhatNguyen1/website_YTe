// const connectDB = import("../config/config")
const { sql } = require("../config/config");

class PatientRegistrationModel {
  static async getAllPatientRegistration() {
    try {
      await sql.connect();
      const result = await sql.query`SELECT * FROM Appointments`

      return result.recordset;
    } catch (error) {
      console.error("Lỗi lấy danh sách ");
      throw error;
    }
  }
  static async createPatientRegistration(data) {
    try {
      await sql.connect();
      const {
        fullName,
        gender,
        appointmentDate,
        appointmentTime,
        consultationTypeID,
        medicalReason
      } = data;

      // add patient
      const patientResult =
        await sql.query`INSERT INTO Patients (FullName, Gender, DateOfBirth)
        OUTPUT INSERTED.PatientID VALUES (${fullName}, ${
          gender === "Nam" ? 1 : 0
        }, GETDATE())`;

      console.log("Kết quả thêm bệnh nhân:", patientResult.recordset);

      const patientId = patientResult.recordset[0].PatientID;

      // Get ConsultationTypeID
      const consultationTypeResult = await sql.query`
      SELECT ConsultationTypeID FROM ConsultationTypes
      WHERE ConsultationTypeID = ${consultationTypeID}
      `;
      // Debug
      console.log("Kết quả truy vấn loại tư vấn:", consultationTypeResult.recordset);
      const consultationTypeId =
        consultationTypeResult.recordset[0].ConsultationTypeID;

      if (consultationTypeResult.recordset.length === 0) {
        throw new Error("ConsultationType không tồn tại.");
      }

      // Thêm cuộc hẹn mới
      const appointmentResult = await sql.query`
      INSERT INTO Appointments (PatientID, ConsultationTypeID, AppointmentDate, AppointmentTime, MedicalReason)
      OUTPUT INSERTED.AppointmentID
      VALUES (${patientId}, ${consultationTypeId}, ${appointmentDate}, ${appointmentTime}, ${medicalReason})
      `;
      // Debug
      console.log("Kết quả thêm cuộc hẹn:", appointmentResult.recordset);
      const appointmentId = appointmentResult.recordset[0].AppointmentID;

      return { patientId, appointmentId };
    } catch (error) {
      console.log("Lỗi: ", error);
      throw error;
    }
  }

  static async getConsultationTypes() {
    try {
      await sql.connect();
      const result = await sql.query`SELECT ConsultationTypeID, ConsultationName FROM ConsultationTypes`;
      return result.recordset;
    } catch (error) {
      console.log("Lỗi: ", error);
      throw error;
    }
  }
}

module.exports = PatientRegistrationModel;
