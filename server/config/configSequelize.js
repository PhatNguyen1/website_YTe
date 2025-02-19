const { Sequelize } = require("sequelize");
const path = require("path");

const sequelize = new Sequelize("hospital", "truong", "admin", {
  host: "localhost",
  dialect: "mssql",
  dialectModule: require("tedious"),
  logging: false,
  pool: {
    max: 5, // Số lượng kết nối tối đa trong pool
    min: 0, // Số lượng kết nối tối thiểu trong pool
    acquire: 30000, // Thời gian tối đa (ms) để cố gắng lấy kết nối trước khi lỗi
    idle: 10000, // Thời gian (ms) kết nối có thể nhàn rỗi trước khi bị giải phóng
  },
  dialectOptions: {
    options: {
      encrypt: true, // Sử dụng cho kết nối Azure hoặc nếu yêu cầu
      trustServerCertificate: true, // Chỉ sử dụng trong môi trường dev
    },
  },
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Kết nối thành công với MSSQL!");
  } catch (error) {
    console.error("Không thể kết nối đến MSSQL:", error);
  }
})();

module.exports = sequelize;
