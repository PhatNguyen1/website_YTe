// const connectDB = import("../config/config")
const { sql } = require("../config/config");

class PatientRegistrationModel {
  static async getAllPatientRegistration() {
    try {
      await sql.connect();
      const result = await sql.query`SELECT * FROM appointments`;

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
        medicalReason,
        hospitalID,
      } = data;

      // add patient
      const patientResult =
        await sql.query`INSERT INTO Patients (full_name, gender, date_of_birth)
        OUTPUT INSERTED.patient_id VALUES (${fullName}, ${
          gender === "Nam" ? 1 : 0
        }, GETDATE())`;

      console.log("Kết quả thêm bệnh nhân:", patientResult.recordset);

      const patientId = patientResult.recordset[0].patient_id;

      // Get ConsultationTypeID
      const consultationTypeResult = await sql.query`
      SELECT consultation_type_id FROM consultation_types
      WHERE consultation_type_id = ${consultationTypeID}
      `;

      // Debug
      // console.log("Kết quả truy vấn loại tư vấn:", consultationTypeResult.recordset);
      
      const consultationTypeId =
        consultationTypeResult.recordset[0].consultation_type_id;

      if (consultationTypeResult.recordset.length === 0) {
        throw new Error("ConsultationType không tồn tại.");
      }

      // Thêm cuộc hẹn mới
      const appointmentResult = await sql.query`
      INSERT INTO appointments (patient_id, consultation_type_id, appointment_date, appointment_time, medical_reason, hospital_id)
      OUTPUT INSERTED.appointment_id
      VALUES (${patientId}, ${consultationTypeId}, ${appointmentDate}, ${appointmentTime}, ${medicalReason}, ${hospitalID})
      `;
      // Debug
      console.log("Kết quả thêm cuộc hẹn:", appointmentResult.recordset);

      const appointmentId = appointmentResult.recordset[0].appointment_id;

      // get Hospital
      const hospitalResult = await sql.query`
        SELECT hospital_id FROM hospital 
        WHERE hospital_id = ${hospitalID}
      `;

      if (hospitalResult.recordset.length === 0) {
        // Insert HospitalID into Hospital table if it does not exist
        await sql.query`
        INSERT INTO hospital (hospital_id)
        VALUES (${hospitalID})`;
        console.log(`HospitalID ${hospitalID} đã được thêm vào bảng Hospital.`);
      } else {
        console.log(`HospitalID ${hospitalID} đã tồn tại trong bảng Hospital.`);
      }

      return { patientId, appointmentId, hospitalID };
    } catch (error) {
      console.log("Lỗi: ", error);
      throw error;
    }
  }

  static async getConsultationTypes() {
    try {
      await sql.connect();
      const result =
        await sql.query`SELECT consultation_type_id, consultation_name FROM consultation_types`;

      // await sql.query`SELECT id, ConsultationName FROM ConsultationTypes`;
      return result.recordset;
    } catch (error) {
      console.log("Lỗi: ", error);
      throw error;
    }
  }
}

module.exports = PatientRegistrationModel;
