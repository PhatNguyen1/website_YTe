const express = require('express');
const cors = require('cors'); 
const bodyParser = require('body-parser');
const { conn, sql } = require('./config/config'); // Giả sử bạn đã cấu hình kết nối ở đây
const app = express();

const router = express.Router();


app.use(bodyParser.json());
app.use(cors());


// API để lấy danh sách bệnh nhân
// router.get('/api/patients', async (req, res) => {
//     try {
//         const pool = await conn; // Lấy kết nối từ module connect
//         // Thực hiện truy vấn SQL để lấy dữ liệu từ nhiều bảng
//         const result = await pool.request().query(`
//            SELECT 
//                 p.patient_id AS maBN,
//                 p.patient_name AS HoTen, 
//                 p.date_of_birth AS NgaySinh, 
//                 p.gender AS GioiTinh, 
//                 mr.career AS NgheNghiep, 
//                 mr.nationality AS QuocTich, 
//                 mr.patient_address AS DiaChi, 
//                 p.nation AS DanToc, 
//                 mr.phone_num AS SoDienThoai, 
//                 mr.examination_place AS NoiChuaBenh, 
//                 p.identification AS CCCD, 
//                 mr.examination_date AS NgayKham, 
//                 mr.object_type AS DoiTuong, 
//                 vs.heart_rate AS Mach, 
//                 vs.blood_pressure AS HuyetAp, 
//                 vs.temperature AS NhietDo, 
//                 mr.reason_for_visit AS LyDoKham, 
//                 at.type_name AS CongKham,  
//                 mr.room AS PhongKham
//             FROM 
//                 Patient p
//             LEFT JOIN 
//                 MedicalRecord mr ON p.patient_id = mr.patient_id
//             LEFT JOIN 
//                 VitalSigns vs ON mr.medicalRecord_id = vs.medicalRecord_id
//             LEFT JOIN 
//                 AppointmentTypes at ON mr.appointment_type_id = at.appointment_type_id
//         `);

//         // Trả kết quả dưới dạng JSON
//         res.json(result.recordset);
//     } catch (err) {
//         console.error('Lỗi truy vấn SQL:', err);
//         res.status(500).send('Lỗi khi lấy dữ liệu từ cơ sở dữ liệu');
//     }
// }); 
//sửa
async function getPatients(req, res) {
    try {
        const pool = await conn; // Get connection from the connect module
        // Execute SQL query to retrieve data from multiple tables
        const result = await pool.request().query(`
            SELECT
                p.patient_id AS maBN,
                p.patient_name AS HoTen,
                p.date_of_birth AS NgaySinh,
                p.gender AS GioiTinh,
                mr.career AS NgheNghiep,
                mr.nationality AS QuocTich,
                mr.patient_address AS DiaChi,
                p.nation AS DanToc,
                mr.phone_num AS SoDienThoai,
                mr.examination_place AS NoiChuaBenh,
                p.identification AS CCCD,
                mr.examination_date AS NgayKham,
                mr.object_type AS DoiTuong,
                vs.heart_rate AS Mach,
                vs.blood_pressure AS HuyetAp,
                vs.temperature AS NhietDo,
                mr.reason_for_visit AS LyDoKham,
                at.type_name AS CongKham,
                mr.room AS PhongKham
            FROM
                Patient p
            LEFT JOIN
                MedicalRecord mr ON p.patient_id = mr.patient_id
            LEFT JOIN
                VitalSigns vs ON mr.medicalRecord_id = vs.medicalRecord_id
            LEFT JOIN
                AppointmentTypes at ON mr.appointment_type_id = at.appointment_type_id
        `);

        // Return the result as JSON
        res.json(result.recordset);
    } catch (err) {
        console.error('SQL query error:', err);
        res.status(500).send('Error retrieving data from the database');
    }
}

// app.listen(8001, function () {
//     console.log("Server đang chạy trên cổng 8001");
// });
module.exports = { getPatients };