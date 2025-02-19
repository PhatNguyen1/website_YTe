const { sequelize } = require('../models');
// Kiểm tra kết nối
sequelize.authenticate()
  .then(() => {
    console.log('Kết nối thành công đến cơ sở dữ liệu:');
    console.log(`Tên cơ sở dữ liệu: ${sequelize.config.database}`);
  })
  .catch(err => {
    console.error('Kết nối thất bại:', err);
  })
  .finally(() => {
    // Đóng kết nối sau khi kiểm tra xong
    sequelize.close();
  });
